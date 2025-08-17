# Bundle Analysis Scripts

This directory contains scripts for monitoring and analyzing webpack bundle sizes to ensure optimal frontend performance.

## Scripts

### `analyze-bundle.js`
Generates comprehensive bundle analysis reports including:
- Visual bundle composition report (HTML)
- Detailed bundle statistics (JSON)
- Quick summary of largest chunks

**Usage:**
```bash
npm run analyze-bundle
```

### `validate-bundle-size.js`
Validates bundle sizes against predefined thresholds and fails builds if limits are exceeded.

**Thresholds:**
- Maximum chunk size: 244 KiB (webpack recommendation)
- Editor bundle: 512 KiB (down from 1.06 MiB)
- Index bundle: 244 KiB (down from 696 KiB)
- Total application: 1 MiB

**Usage:**
```bash
npm run validate-bundle
```

## NPM Scripts

- `npm run build:analyze` - Build with bundle analysis enabled
- `npm run analyze-bundle` - Generate bundle analysis report
- `npm run validate-bundle` - Validate bundle sizes against thresholds

## CI/CD Integration

### Earthly
Bundle size validation is integrated into the CI pipeline via the `test-bundle-size` target in the Earthfile.

### GitHub Actions
- **Bundle Analysis Workflow**: Runs on PRs affecting frontend code
- **Size Regression Detection**: Compares bundle sizes between PR and main branch
- **Automated Comments**: Posts bundle analysis results on PRs

## Bundle Size Thresholds

The validation script enforces the following limits based on performance requirements:

| Bundle Type | Current Size | Target Size | Status |
|-------------|--------------|-------------|---------|
| Editor | 1.06 MiB | 512 KiB | ❌ Needs optimization |
| Index | 696 KiB | 244 KiB | ❌ Needs optimization |
| Individual Chunks | - | 244 KiB | ✅ Enforced |
| Total Application | ~1.7 MiB | 1 MiB | ❌ Needs optimization |

## Optimization Recommendations

When bundle size violations occur, consider:

1. **Code Splitting**: Split large chunks into smaller, loadable pieces
2. **Dynamic Imports**: Use `import()` for non-critical code
3. **Tree Shaking**: Ensure unused code is eliminated
4. **Lazy Loading**: Load editor components only when needed
5. **Dependency Analysis**: Review and optimize large dependencies

## Monitoring

Bundle sizes are monitored through:
- CI/CD pipeline failures on size regressions
- PR comments with size analysis
- Artifact uploads of detailed reports
- Automated alerts for threshold violations