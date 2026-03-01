import type { Container, Engine, IParticleUpdater, Particle } from '@tsparticles/engine';

// Extended particle type to hold our custom physics variables
export type EvolutionParticle = Particle & {
  evolutionConfig?: {
    deathTimer: number;
    maxDeathTimer: number;
    maturity: number;
    maxMaturity: number;
    isBlackSwan: boolean;
    hasHit?: boolean;
    connectionTime: number;
    baseSize: number;
    baseOpacity: number;
    baseSpeed: number;
  };
};

export class EvolutionUpdater implements IParticleUpdater {
  constructor(private readonly container: Container) {}

  isEnabled(particle: EvolutionParticle): boolean {
    // Only run if the particle is not destroyed
    return !particle.destroyed;
  }

  init(particle: EvolutionParticle): void {
    // Increase probability slightly for observability, and guarantee at least one occasionally
    // Black swans can ONLY be born during the respawn phase when the system is stagnant. Never on initial load.
    const isBlackSwan = false;

    particle.evolutionConfig = {
      deathTimer: 300 + Math.random() * 300, // 5-10 seconds at 60fps
      maxDeathTimer: 600,
      maturity: 0,
      connectionTime: 0,
      maxMaturity: 100,
      isBlackSwan,
      baseSize: typeof particle.options.size.value === 'number' ? particle.options.size.value : 2,
      baseOpacity:
        typeof particle.options.opacity.value === 'number' ? particle.options.opacity.value : 0.5,
      baseSpeed: typeof particle.options.move.speed === 'number' ? particle.options.move.speed : 1,
    };

    if (isBlackSwan) {
      // Black Swans are fast and distinct - making them visually red/hot
      particle.velocity.x *= 2;
      particle.velocity.y *= 2;
      if (particle.color) {
        (particle.color as any).value = '#ef4444'; // Tailwind red-500
      }
    }
  }

  update(particle: EvolutionParticle, delta: { value: number; factor: number }): void {
    if (!this.isEnabled(particle) || !particle.evolutionConfig) return;

    const config = particle.evolutionConfig;
    let links = (particle as any).links;

    // --- 1. OVERLOAD MECHANISM ---
    const MAX_CONNECTIONS = 6;
    if (links && links.length > MAX_CONNECTIONS) {
      links = [];
      (particle as any).links = [];
      config.connectionTime = 0;
      config.maturity = Math.max(0, config.maturity - 50);
      particle.velocity.x += (Math.random() - 0.5) * 2;
      particle.velocity.y += (Math.random() - 0.5) * 2;
    }

    const hasLinks = links && links.length > 0;

    // --- 2. BLACK SWAN HOMING & DECAY ---
    if (config.isBlackSwan) {
      // Delta-corrected friction: v_new = v_old * (1 - friction * dt)
      // Base friction is say 2% per frame at 60fps.
      const friction = 0.98 ** delta.factor;
      particle.velocity.x *= friction;
      particle.velocity.y *= friction;

      config.deathTimer -= 1 * delta.factor;
      if (config.deathTimer <= 0) {
        config.isBlackSwan = false;
        config.hasHit = true;
      }

      let targetX = 0;
      let targetY = 0;
      let matureWeight = 0;

      const allParticles = this.container.particles.filter(() => true) as EvolutionParticle[];
      for (const p of allParticles) {
        if (p !== particle && p.evolutionConfig && p.evolutionConfig.maturity > 50) {
          targetX += p.position.x * p.evolutionConfig.maturity;
          targetY += p.position.y * p.evolutionConfig.maturity;
          matureWeight += p.evolutionConfig.maturity;
        }
      }

      if (matureWeight > 0) {
        targetX /= matureWeight;
        targetY /= matureWeight;

        const dx = targetX - particle.position.x;
        const dy = targetY - particle.position.y;
        const distSq = dx * dx + dy * dy;

        if (distSq > 0) {
          const dist = Math.sqrt(distSq);
          // Homing force correctly multiplied by delta
          const steeringForce = 0.5 * delta.factor;
          particle.velocity.x += (dx / dist) * steeringForce;
          particle.velocity.y += (dy / dist) * steeringForce;

          const speed = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
          if (speed > config.baseSpeed * 2) {
            particle.velocity.x = (particle.velocity.x / speed) * config.baseSpeed * 2;
            particle.velocity.y = (particle.velocity.y / speed) * config.baseSpeed * 2;
          }
        }
      }
    }

    // --- 3. FORCE-DIRECTED PHYSICS ---
    if (!config.isBlackSwan) {
      const allParticles = this.container.particles.filter(() => true) as EvolutionParticle[];
      for (const other of allParticles) {
        if (other === particle || other.destroyed) continue;

        const dx = particle.position.x - other.position.x;
        const dy = particle.position.y - other.position.y;
        const distSq = dx * dx + dy * dy;

        // REPULSION
        if (distSq > 0 && distSq < 22500) {
          const dist = Math.sqrt(distSq);
          const repulseForce = (150 / (distSq + 100)) * delta.factor;
          particle.velocity.x += (dx / dist) * repulseForce;
          particle.velocity.y += (dy / dist) * repulseForce;
        }
      }

      // ATTRACTION (Links)
      if (hasLinks) {
        for (const link of links) {
          const other = link.destination as EvolutionParticle;
          if (!other || other.destroyed) continue;

          const dx = other.position.x - particle.position.x;
          const dy = other.position.y - particle.position.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > 0) {
            const dist = Math.sqrt(distSq);
            const attractForce = dist * 0.0005 * delta.factor;
            particle.velocity.x += (dx / dist) * attractForce;
            particle.velocity.y += (dy / dist) * attractForce;
          }
        }
      }
    }

    // --- 4. SHATTER EVENT (Collision Check) ---
    if (config.isBlackSwan) {
      const particles = this.container.particles.filter(() => true) as EvolutionParticle[];
      for (const other of particles) {
        if (
          other === particle ||
          other.destroyed ||
          !other.evolutionConfig ||
          other.evolutionConfig.isBlackSwan
        )
          continue;

        if (other.evolutionConfig.maturity > 50) {
          const dx = particle.position.x - other.position.x;
          const dy = particle.position.y - other.position.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 25000) {
            other.evolutionConfig.maturity = 0;
            other.evolutionConfig.deathTimer = 10;
            if ((other as any).links) (other as any).links = [];

            // Massive kinetic injection
            const explosionForce = 150 / Math.max(Math.sqrt(distSq), 10);
            const actualForce = Math.min(explosionForce, 5); // Hard cap
            other.velocity.x = -dx * actualForce + (Math.random() - 0.5) * 2;
            other.velocity.y = -dy * actualForce + (Math.random() - 0.5) * 2;

            if (other.color) (other.color as any).value = '#fbbf24';
            if (other.size) other.size.value = 5;

            particle.evolutionConfig.hasHit = true;
          }
        }
      }
    }

    if (config.hasHit) {
      config.isBlackSwan = false;
      config.deathTimer = 0;
      config.hasHit = false;
    }

    // --- 5. EVOLUTION & LIFECYCLE ---
    if (hasLinks) {
      config.connectionTime += 1 * delta.factor;
    } else {
      config.connectionTime = Math.max(0, config.connectionTime - 2 * delta.factor);
    }

    const hasStableConnection = config.connectionTime > 60;

    if (hasStableConnection) {
      config.deathTimer = config.maxDeathTimer;

      if (config.maturity < config.maxMaturity) {
        config.maturity += 0.33 * delta.factor;
      }

      const maturityRatio = config.maturity / config.maxMaturity;
      if (particle.size) {
        const targetSize = config.baseSize + maturityRatio * 2.5;
        // Proper LERP with delta
        const lerpFactor = 1 - 0.98 ** delta.factor;
        particle.size.value =
          (particle.size.value as number) + (targetSize - particle.size.value) * lerpFactor;
      }
      if (particle.opacity) {
        const targetOpacity = config.baseOpacity + maturityRatio * 0.5;
        const lerpFactor = 1 - 0.98 ** delta.factor;
        particle.opacity.value =
          ((particle.opacity.value as number) || 0) +
          (targetOpacity - ((particle.opacity.value as number) || 0)) * lerpFactor;
      }

      // STAGNATION CLAMP
      const damping = 1 - maturityRatio * 0.7;
      const currentSpeed = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
      const targetSpeed = config.baseSpeed * damping;
      if (currentSpeed > targetSpeed && currentSpeed > 0.1 && config.maturity > 5) {
        const ratio = targetSpeed / currentSpeed;
        particle.velocity.x *= ratio;
        particle.velocity.y *= ratio;
      }
    } else {
      if (config.maturity > 0) {
        config.maturity -= 2 * delta.factor;
        if (config.maturity < 0) config.maturity = 0;
      }

      const currentSpeed = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);

      if (currentSpeed < config.baseSpeed) {
        // Delta-corrected acceleration
        const accel = 1.05 ** delta.factor;
        particle.velocity.x *= accel;
        particle.velocity.y *= accel;
      } else if (currentSpeed > config.baseSpeed * 1.5) {
        // Delta-corrected global cooling friction for explosion fragments
        const cooling = 0.96 ** delta.factor; // 4% friction
        particle.velocity.x *= cooling;
        particle.velocity.y *= cooling;
      }

      config.deathTimer -= 1 * delta.factor;

      if (config.deathTimer < 60) {
        const deathRatio = Math.max(0, config.deathTimer / 60);
        if (particle.opacity) particle.opacity.value = config.baseOpacity * deathRatio;
        if (particle.size) particle.size.value = config.baseSize * deathRatio;
      } else {
        if (particle.size) {
          const lerpFactor = 1 - 0.95 ** delta.factor;
          particle.size.value =
            (particle.size.value as number) + (config.baseSize - particle.size.value) * lerpFactor;
        }
        if (particle.opacity) {
          const lerpFactor = 1 - 0.95 ** delta.factor;
          particle.opacity.value =
            ((particle.opacity.value as number) || 0) +
            (config.baseOpacity - ((particle.opacity.value as number) || 0)) * lerpFactor;
        }
      }

      if (config.deathTimer <= 0) {
        particle.position.x = Math.random() * (particle.container.canvas.size.width || 800);
        particle.position.y = Math.random() * (particle.container.canvas.size.height || 800);

        config.deathTimer = config.maxDeathTimer;
        config.maturity = 0;
        config.connectionTime = 0;

        if (particle.opacity) particle.opacity.value = 0;
        if (particle.size) particle.size.value = 0;

        const allParticles = this.container.particles.filter(() => true) as EvolutionParticle[];
        let matureCount = 0;
        let swanCount = 0;
        for (const p of allParticles) {
          if (p.evolutionConfig?.isBlackSwan) swanCount++;
          if (p.evolutionConfig && p.evolutionConfig.maturity > 80) matureCount++;
        }

        const stagnationRatio = matureCount / allParticles.length;
        let spawnChance = 0.0;
        if (stagnationRatio > 0.5 && swanCount === 0) {
          spawnChance = 0.02;
        }

        config.isBlackSwan = Math.random() < spawnChance;

        if (config.isBlackSwan) {
          particle.velocity.x *= 4;
          particle.velocity.y *= 4;
          if (particle.color) (particle.color as any).value = '#ef4444';
        } else {
          if (particle.color) (particle.color as any).value = particle.options.color.value;
        }
      }
    }
  }
}

// Function to register the updater plugin
export async function loadEvolutionUpdater(engine: Engine): Promise<void> {
  await engine.addParticleUpdater(
    'evolution',
    async (container) => new EvolutionUpdater(container)
  );
}
