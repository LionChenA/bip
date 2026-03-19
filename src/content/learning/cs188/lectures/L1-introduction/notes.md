---
courseId: CS188
moduleId: L1
type: lecture
status: in-progress
prerequisites: []
core_concepts:
  - Agent
  - Rationality
---

## Resource Summary

| Resource | Link |
|----------|------|
| Videos | [YouTube](https://www.youtube.com/watch?v=Awv7S9HI0wM) |
| Slides | [lec01.pdf](../../slides/lec01.pdf) |
| Transcript | [.tutor/lecturescript.txt](.tutor/lecturescript.txt) |
| Textbook | [agents.md](../../textbook/agents.md) |

---

# L1: Introduction

## Lecture Structure

```
L1: Introduction
├── 1. What is AI?
├── 2. Four Approaches to AI
├── 3. Rationality
└── 4. Agent
```

## Learning Objectives

-

## Core Concept Questions

-

## Notes

### 1. What is AI?

> AI is a self-defeating definition: if you say AI is all those things that require human intelligence, and then as soon as you can do them well, it doesn't require human intelligence anymore. — Pieter Abbeel

AI is a self-defeating term: once a capability is achieved and understood, it's no longer considered AI.

---

### 2. Four Approaches to AI

> There have been multiple historical answers to "what is AI":

#### Symbolic AI (Think Rationally - Early Form)

> The oldest answer is: it's the science of making machines that think rationally using logic and rules. This goes back to Plato and Aristotle and modus ponens.

Symbolic AI is making machines think using logic and rules. Famous example: Expert Systems - rules written by human experts. The biggest problem: cannot scale - too expensive to write rules for every case.

This is essentially a precursor to "Thinking Like People".

#### Thinking Like People

> Building machines that think like people: reverse-engineering human brain and cognitive processes. This is more connected to cognitive science.

Thinking Like People focuses on how humans think - related to cognitive science, learning science, brain science. The problem is: we don't fully understand how our brains work. This research is heavily constrained by brain science advances. Most research is based on empirical induction.

#### Acting Like People (Turing Test)

> One way to tell intelligence is the Turing test: put a computer in one room and human in another, talk via typewriter, if you can't tell them apart - maybe intelligence?

There's a famous thought experiment: Infinite Monkey Theorem - a monkey typing randomly for infinite time might produce Shakespeare. But does this mean the monkey understands writing? This is the core question of Turing Test.

#### Acting Rationally (Modern - Course Focus)

> The modern approach is to build systems that act rationally: we focus on the decision systems make, not how they think. We build systems that act optimally.

This shift makes AI more practical - instead of mimicking human thinking (which we don't fully understand), we focus on achieving results.

---

### 3. Rationality

> When we talk about rationality in this course, we mean something very specific: a system that maximally achieves some predefined goals. Rationality only concerns the decisions that are being made, not the thought process behind them. Goals are expressed in terms of utility. Being rational = maximizing your expected utility.

Key points:
- Rationality = maximally achieving predefined goals
- Utility = the value or desirability of outcomes
- Expected Utility = utility weighted by probability (because world is uncertain)
- Computational Rationality = computing optimal action to maximize expected utility

A vacuum cleaner (clean dirt) and a pet dog (make mess) can BOTH be rational if they optimally achieve their goals.

> If you're gonna get a CS188 tattoo, it would be: "Maximize your expected utility."

---

### 4. Agent

> We're gonna be talking about designing rational agents. That's an agent that perceives and acts. You control the agent, you don't control the environment. What comes into the agent are percepts from the sensors. What goes out are actions from the actuators. The question mark in the middle - that's the agent's behavior. That's the agent function. That's what we write in this class.

Agent = An entity that perceives and acts in an environment to achieve its goals.

The Agent Model:
- Percepts: sensory inputs from sensors
- Actions: outputs to actuators
- Agent Function: decision-making procedure that maps percepts → actions (THIS is what we program!)

Example: Pac-Man
- Sensors: dot positions, ghost positions
- Actuators: joystick (up/down/left/right)
- Environment: maze, ghosts

Personal Insight: The agent abstraction is powerful because it unifies all AI problems - from playing games to driving cars. The key question is always: "What's the agent function?"

---

### Brains vs AI

> Brains are very good at making rational decisions, but they're not perfect. Human brain has ~100 trillion synapses, ChatGPT-4 has ~1.8 trillion weights.

The brain is a general-purpose intelligence - it's a physiological organ with very low energy consumption and ~100 trillion synaptic connections.

The problem is: Brains cannot be modularized like software - we can't easily extract or replace specific parts. This makes reverse-engineering the brain extremely difficult.

---

### PEAS Framework

> Every agent can be described by PEAS: Performance measure, Environment, Actuators, Sensors.

PEAS is used to describe an agent:

| Letter | Meaning | Self-Driving Car |
|--------|---------|------------------|
| **P**erformance | How do we measure success? | Safe, fast, legal |
| **E**nvironment | Where does it operate? | Roads, traffic, weather |
| **A**ctuators | How does it act? | Steering, brakes, accelerator |
| **S**ensors | How does it perceive? | Cameras, LIDAR, GPS |

The Agent Model (visual):

```
┌─────────────────────────────────────┐
│           ENVIRONMENT               │
│   (You DON'T control this)          │
│                                     │
│    ┌──────────────┐                │
│    │    AGENT     │                │
│    │              │                │
│    │ Percepts ──► │ ──► Actions    │
│    │ (Sensors)   │   (Actuators)  │
│    └──────────────┘                │
│           ▲                        │
│           │                        │
│    Agent Function                  │
│    (f: Percepts → Actions)         │
└─────────────────────────────────────┘
```
