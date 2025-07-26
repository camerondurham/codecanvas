# Implementation Plan

- [x] 1. Create staging Fly.io configuration
  - Create `fly.staging.toml` configuration file with staging-specific settings
  - Configure staging app name, URL, and environment variables
  - Set up staging-specific resource allocation and scaling parameters
  - _Requirements: 1.1, 1.3, 4.1, 4.3_

- [x] 2. Implement dynamic environment selection in frontend
  - [x] 2.1 Add environment selector dropdown to UI
    - Add environment selector dropdown to the `.selectors` div in index.html
    - Create dropdown with options for local, staging, and production environments
    - Add visual styling to match existing language and theme selectors
    - _Requirements: 2.1, 2.4_

  - [x] 2.2 Implement runtime environment switching
    - Update `web-frontend/js/config-utils.js` to support dynamic environment switching
    - Implement environment configuration object with all available environments
    - Add functions to change environment and update API endpoints dynamically
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 2.3 Add environment status indicators
    - Implement visual feedback for currently selected environment
    - Add environment status badge or indicator in the UI
    - Create optional health check functionality for environment availability
    - _Requirements: 2.4_

- [x] 3. Create staging deployment GitHub Actions workflow
  - [x] 3.1 Implement staging deployment workflow
    - Create `.github/workflows/staging-deploy.yml` for staging branch deployments
    - Configure workflow to trigger on pushes to staging branch
    - Add Fly.io staging deployment steps using staging configuration
    - _Requirements: 1.1, 1.2_

  - [x] 3.2 Simplify frontend deployment workflow
    - Update staging workflow to deploy single frontend build that supports all environments
    - Remove environment-specific frontend builds since environment selection is now dynamic
    - Ensure frontend deployment includes all environment configurations
    - _Requirements: 2.1_

- [ ] 4. Implement integration testing suite
  - [ ] 4.1 Create API integration tests for staging environment
    - Write integration tests that validate API endpoints against staging environment
    - Implement tests for language support, code execution, and error handling
    - Add test configuration to run against staging URL
    - _Requirements: 3.1, 3.2_

  - [ ] 4.2 Add frontend integration tests
    - Create tests that validate frontend-backend integration in staging
    - Implement tests for environment configuration and API connectivity
    - Add automated testing of user workflows against staging environment
    - _Requirements: 3.1, 3.2_

  - [ ] 4.3 Integrate tests into staging deployment workflow
    - Add integration test execution to staging deployment workflow
    - Configure tests to run after successful staging deployment
    - Implement test result reporting and failure handling
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5. Create production promotion workflow
  - [ ] 5.1 Implement promotion mechanism
    - Create workflow for promoting staging deployments to production
    - Add manual approval gates for production deployment
    - Implement Docker image promotion from staging to production
    - _Requirements: 5.1, 5.2_

  - [ ] 5.2 Add production deployment validation
    - Implement pre-deployment checks for production promotion
    - Add production smoke tests after deployment
    - Create rollback mechanism for failed production deployments
    - _Requirements: 5.3, 5.4_

- [ ] 6. Update existing production workflow
  - Modify existing `.github/workflows/flyctl-deploy.yml` to work with promotion workflow
  - Add safeguards to prevent direct production deployment bypassing staging
  - Update workflow to use promoted Docker images rather than rebuilding
  - _Requirements: 5.1, 5.2_

- [ ] 7. Implement environment labeling and resource management
  - [ ] 7.1 Add environment identification to deployments
    - Implement environment labeling in Docker images and Fly.io apps
    - Add environment-specific tags and metadata to deployments
    - Create environment identification in application logs and metrics
    - _Requirements: 4.3_

  - [ ] 7.2 Create staging resource cleanup automation
    - Implement automated cleanup for staging environment resources
    - Create scripts for staging environment maintenance
    - _Requirements: 4.4_
- [ ] 8. Create documentation and operational procedures
  - [ ] 8.1 Write deployment and promotion procedures
    - Create documentation for staging deployment process
    - Write procedures for production promotion and rollback
    - Document troubleshooting steps for common deployment issues
    - _Requirements: 5.1, 5.4_

  - [ ] 8.2 Create environment management scripts
    - Write scripts for environment setup and configuration
    - Create utilities for environment status checking and maintenance
    - Implement helper scripts for common operational tasks
    - _Requirements: 4.4, 5.1_