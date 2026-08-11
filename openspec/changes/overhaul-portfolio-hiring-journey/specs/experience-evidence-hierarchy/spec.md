## ADDED Requirements

### Requirement: Current and relevant experience receives primary treatment
The Experience section SHALL present VISEO and HustleWing as primary evidence with role, company, period, status, concise scope, personal ownership, constraints or decisions, and no more than two strongest proof points per record.

#### Scenario: VISEO presentation
- **WHEN** the VISEO record is rendered
- **THEN** its current senior role, institutional settlement scope, multi-network integration responsibility, and strongest reviewed evidence are visible before technology metadata

#### Scenario: HustleWing presentation
- **WHEN** the HustleWing record is rendered
- **THEN** its lead role, hiring/entrepreneurship platform scope, production-AI delivery, and employer-project attribution are visible before technology metadata

### Requirement: Earlier experience is deliberately compressed
The Experience section SHALL group Outliant and Vibravid under an explicit Earlier Experience treatment that preserves chronology and relevance without giving them the same narrative weight as primary records.

#### Scenario: Earlier role scan
- **WHEN** a visitor reaches Earlier Experience
- **THEN** each record exposes role, company, period, and one concise relevant contribution without expanded proof lists, project cards, or full technology inventories

#### Scenario: Chronological integrity
- **WHEN** primary and earlier records are read in sequence
- **THEN** reverse chronology remains clear and no employment period or employer attribution is lost

### Requirement: Experience presentation tier is explicit data
Every experience record SHALL declare a presentation tier used by the renderer, rather than deriving prominence from array position, employer name, or component conditionals.

#### Scenario: New experience record
- **WHEN** a reviewed experience record is added to portfolio data
- **THEN** it cannot be rendered until it is classified for primary or earlier presentation

#### Scenario: Experience order changes
- **WHEN** records are reordered chronologically
- **THEN** their intended presentation depth remains stable because it is encoded independently of array index

### Requirement: Technology supports rather than substitutes for evidence
Technology names SHALL appear after scope, ownership, constraint, and outcome-oriented evidence, and SHALL use a compressed metadata treatment that does not dominate the entry.

#### Scenario: Primary entry without reading tags
- **WHEN** a visitor ignores all technology metadata
- **THEN** the entry still communicates why the experience is relevant and what Raphael owned or decided

#### Scenario: Earlier entry technology density
- **WHEN** an earlier record renders
- **THEN** it contains at most a short technology summary or omits technology metadata when the relevance statement already carries the evidence

### Requirement: Employer projects remain correctly attributed
Employer-project evidence SHALL remain nested under the employer through which it was delivered and SHALL not imply a separate employer relationship or sole ownership beyond reviewed sources.

#### Scenario: Ample News appears in experience
- **WHEN** Ample News is referenced in the HustleWing record
- **THEN** it is clearly labeled as an employer project delivered under HustleWing
