## ADDED Requirements
### Requirement: Typography System
The system MUST use a high-quality, self-hosted font stack for English and Code, while relying on system fonts for Chinese to ensure optimal performance.

#### Scenario: Font Selection
- **WHEN** rendering UI or Body text
- **THEN** use `Geist Sans` -> System Sans (PingFang SC).
- **WHEN** rendering Code or Data
- **THEN** use `Maple Mono` -> System Mono.
