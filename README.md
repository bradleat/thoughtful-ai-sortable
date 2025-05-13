# Package Sorting System

A TypeScript implementation of a package sorting system for a robotic automation factory.

## Overview

This system sorts packages into three categories:

- **Standard**: Normal packages (not bulky or heavy)
- **Special**: Packages that are either bulky or heavy
- **Rejected**: Packages that are both bulky and heavy

A package is considered:

- **Bulky** if its volume ≥ 1,000,000 cm³ or any dimension ≥ 150 cm
- **Heavy** if its weight ≥ 20 kg

## Getting Started with Bun

This project uses [Bun](https://bun.sh/), a fast JavaScript runtime and toolkit.

### Prerequisites

To use this project, you need to install Bun:

```bash
# macOS, Linux, or WSL
curl -fsSL https://bun.sh/install | bash

# Windows (via PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Homebrew (macOS and Linux)
brew tap oven-sh/bun
brew install bun
```

### Installation

1. Clone this repository:

   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

### Running Tests

Run the test suite with:

```bash
bun test
```

## Usage

```typescript
import { SortablePackage, SortablePackageDispatchContext } from "./sortable-package";

// Create a new package
const package1 = new SortablePackage({
  widthInCM: 100,
  heightInCM: 50, 
  lengthInCM: 30,
  weightInKG: 10
});

// Check where the package should be sorted
const sortPile = package1.getSortPile();
console.log(`Package should go to: ${sortPile}`);

// Add packages to a dispatch context
const dispatchContext = new SortablePackageDispatchContext();
dispatchContext.addPackage(package1);
```

## Project Structure

- `sortable-package.ts` - Core implementation of the sorting logic
- `sortable-package.test.ts` - Test suite verifying package sorting functionality

## Features

- Generic typing to support extended package data
- Input validation for dimensions and weight
- Comprehensive test suite
