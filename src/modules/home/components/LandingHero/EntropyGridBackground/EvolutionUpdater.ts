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
      maxMaturity: 100,
      isBlackSwan,
      baseSize: typeof particle.options.size.value === 'number' ? particle.options.size.value : 2,
      baseOpacity:
        typeof particle.options.opacity.value === 'number' ? particle.options.opacity.value : 0.5,
      baseSpeed: typeof particle.options.move.speed === 'number' ? particle.options.move.speed : 1,
    };

    if (isBlackSwan) {
      // Black Swans are fast and distinct - making them visually red/hot
      particle.velocity.x *= 4;
      particle.velocity.y *= 4;
      if (particle.color) {
        (particle.color as any).value = '#ef4444'; // Tailwind red-500
      }
    }
  }

  update(particle: EvolutionParticle, delta: { value: number; factor: number }): void {
    if (!this.isEnabled(particle) || !particle.evolutionConfig) return;

    const config = particle.evolutionConfig;
    const links = (particle as any).links;
    const hasLinks = links && links.length > 0;

    // --- INTERMOLECULAR FORCES (SPRING PHYSICS) ---
    // If connected, particles should attract each other to form clusters,
    // but repel slightly if too close to avoid perfect overlapping.
    if (hasLinks && !config.isBlackSwan) {
      for (const link of links) {
        const other = link.destination as EvolutionParticle;
        if (!other || other.destroyed || !other.evolutionConfig) continue;

        const dx = other.position.x - particle.position.x;
        const dy = other.position.y - particle.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          // Normalization
          const nx = dx / dist;
          const ny = dy / dist;

          // Spring mechanics:
          // Ideal resting distance is 40px.
          // > 60px = Attract
          // < 60px = Repulse strongly
          let force = 0;
          if (dist > 60) {
            force = (dist - 60) * 0.002 * delta.factor; // Gentle pull
          } else {
            force = (dist - 60) * 0.02 * delta.factor; // Strong push apart when too close
          }

          particle.velocity.x += nx * force;
          particle.velocity.y += ny * force;
        }
      }
    }

    // 1. BLACK SWAN LOGIC
    if (config.isBlackSwan) {
      // Black swans burn out quickly if they don't hit anything
      config.deathTimer -= 1 * delta.factor;
      
      // DECELERATION (Friction)
      // The black swan enters like a meteor but loses momentum over time as it fights the entropy
      // Soft friction so it slows down over its 10 second lifespan but does not stop instantly
      particle.velocity.x *= 0.995;
      particle.velocity.y *= 0.995;
      
      if (config.deathTimer <= 0) {
        config.isBlackSwan = false;
        config.hasHit = true; // Trigger death cycle
      }

      // GUIDED MISSILE LOGIC (Targeting the Stagnation)
      // The Black Swan actively hunts down the highest concentration of mature particles.
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
        // Find the center of mass of the stagnant cluster
        targetX /= matureWeight;
        targetY /= matureWeight;

        const dx = targetX - particle.position.x;
        const dy = targetY - particle.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          // Steer the velocity towards the target (Homing behavior)
          const steeringForce = 0.5 * delta.factor;
          particle.velocity.x += (dx / dist) * steeringForce;
          particle.velocity.y += (dy / dist) * steeringForce;

          // Clamp max speed so it doesn't accelerate infinitely while homing
          const speed = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
          if (speed > config.baseSpeed * 4) {
            particle.velocity.x = (particle.velocity.x / speed) * config.baseSpeed * 4;
            particle.velocity.y = (particle.velocity.y / speed) * config.baseSpeed * 4;
          }
        }
      }

      // Find nearby mature particles to shatter
      const particles = this.container.particles.filter(() => true) as EvolutionParticle[];
      for (const other of particles) {
        if (
          other === particle ||
          other.destroyed ||
          !other.evolutionConfig ||
          other.evolutionConfig.isBlackSwan
        )
          continue;

        // If the other particle is mature and close
        if (other.evolutionConfig.maturity > 50) {
          const dx = particle.position.x - other.position.x;
          const dy = particle.position.y - other.position.y;
          const distSq = dx * dx + dy * dy;

          // Impact radius ~ 200px (MASSIVE explosion radius to shatter whole clusters)
          if (distSq < 40000) {
            // SHATTER EVENT
            other.evolutionConfig.maturity = 0;
            other.evolutionConfig.deathTimer = 10; // Instantly start dying, very harsh penalty
            if ((other as any).links) (other as any).links = []; // Force break links

            // Explosive repulsive bounce - make it truly violent and chaotic
            const explosionForce = 300 / Math.max(Math.sqrt(distSq), 1);

            // Add some random noise to the explosion so it scatters unpredictably
            other.velocity.x = -dx * explosionForce + (Math.random() - 0.5) * 5;
            other.velocity.y = -dy * explosionForce + (Math.random() - 0.5) * 5;

            // Flash the particle brightly
            if (other.color) {
              (other.color as any).value = '#fbbf24'; // Flash bright amber
            }
            if (other.size) {
              other.size.value = 5; // Puff up before shrinking
            }

            // Flag that we hit something
            particle.evolutionConfig.hasHit = true;
          }
        }
      }
      return; // Black swans don't follow normal aging
    }

    if (config.hasHit) {
      config.isBlackSwan = false;
      config.deathTimer = 0;
      config.hasHit = false;
    }

    // 2. NORMAL EVOLUTION LOGIC
    if (hasLinks) {
      // CONNECTION: Immortality & Growth
      config.deathTimer = config.maxDeathTimer; // Reset timer

      if (config.maturity < config.maxMaturity) {
        config.maturity += 0.33 * delta.factor; // Grow 3x slower so the evolution takes more time
      }

      // Visual mapping: Grow size and opacity based on maturity with LERP for silk smoothness
      const maturityRatio = config.maturity / config.maxMaturity;
      if (particle.size) {
        const targetSize = config.baseSize + maturityRatio * 2.5;
        // Lerp factor 0.05 means it smoothly glides to the target size over multiple frames
        particle.size.value =
          (particle.size.value as number) +
          (targetSize - particle.size.value) * 0.02 * delta.factor;
      }
      if (particle.opacity) {
        const targetOpacity = config.baseOpacity + maturityRatio * 0.5;
        particle.opacity.value =
          ((particle.opacity.value as number) || 0) +
          (targetOpacity - (particle.opacity.value || 0)) * 0.02 * delta.factor;
      }

      // Physical mapping: Stagnation (slow down as it matures)
      // Velocity damping
      const damping = 1 - maturityRatio * 0.7; // Slow down by up to 70%, so they still drift slowly together
      // In tsParticles, directly modifying velocity every frame can be tricky due to internal normalizations.
      // We apply a soft clamp.
      const currentSpeed = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
      const targetSpeed = config.baseSpeed * damping;
      // Only clamp if it's maturing/stagnating. If it just got shattered (maturity=0 but speed is huge), let it fly!
      if (currentSpeed > targetSpeed && currentSpeed > 0.1 && config.maturity > 5) {
        // Harder clamp to prevent jittering when clustered
        const ratio = targetSpeed / currentSpeed;
        particle.velocity.x *= ratio;
        particle.velocity.y *= ratio;
      }
    } else {
      // ISOLATION: Decay & Death
      if (config.maturity > 0) {
        config.maturity -= 2 * delta.factor; // Shrink fast if disconnected
        if (config.maturity < 0) config.maturity = 0;
      }

      config.deathTimer -= 1 * delta.factor;

      // If it's close to death, fade it out instead of restoring base properties
      if (config.deathTimer < 60) {
        const deathRatio = Math.max(0, config.deathTimer / 60); // 1.0 down to 0.0
        if (particle.opacity) {
          particle.opacity.value = config.baseOpacity * deathRatio;
        }
        if (particle.size) {
          particle.size.value = config.baseSize * deathRatio;
        }
      } else {
        // Normal isolation - restore to base properties smoothly
        if (particle.size) {
          particle.size.value =
            (particle.size.value as number) +
            (config.baseSize - particle.size.value) * 0.02 * delta.factor;
        }
        if (particle.opacity) {
          particle.opacity.value =
            ((particle.opacity.value as number) || 0) +
            (config.baseOpacity - (particle.opacity.value || 0)) * 0.02 * delta.factor;
        }
      }

      if (config.deathTimer <= 0) {
        // Instead of destroying (which permanently depletes population if emitters fail), we "respawn" it
        particle.position.x = Math.random() * (particle.container.canvas.size.width || 800);
        particle.position.y = Math.random() * (particle.container.canvas.size.height || 800);

        // Spawn anywhere randomly in the infinite canvas
        particle.position.x = Math.random() * (particle.container.canvas.size.width || 800);
        particle.position.y = Math.random() * (particle.container.canvas.size.height || 800);

        config.deathTimer = config.maxDeathTimer;
        config.maturity = 0;

        // Reset base properties but keep opacity at 0 so the LERP at the top of the loop smoothly fades it IN
        if (particle.opacity) particle.opacity.value = 0;
        if (particle.size) particle.size.value = 0;

        // Re-roll Black Swan based on global stagnation
        const allParticles = this.container.particles.filter(() => true) as EvolutionParticle[];
        let matureCount = 0;
        for (const p of allParticles) {
          if (p.evolutionConfig && p.evolutionConfig.maturity > 80) matureCount++;
        }

        const stagnationRatio = matureCount / allParticles.length;

        // POPULATION CONTROL: Count existing black swans to prevent armies
        let swanCount = 0;
        for (const p of allParticles) {
          if (p.evolutionConfig && p.evolutionConfig.isBlackSwan) {
            swanCount++;
          }
        }

        // Only allow ONE black swan in the entire universe at any given time.
        // It's a singular historical event.
        let spawnChance = 0.0; // Never spawn by default

        if (stagnationRatio > 0.4 && swanCount === 0) {
          // 2% chance per respawn ONLY when highly stagnant and no other swans exist.
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
