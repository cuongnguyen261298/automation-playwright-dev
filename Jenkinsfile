pipeline {
    agent {
        // docker { 
        //     image 'node:22.15-bookworm'
        //     args '-u root'
        // }
    }

    environment {
        PLAYWRIGHT_REPORT = "The reporter"
    }

    parameters {
        choice(name: 'TEST_ENVIRONMENT', choices: ['production'], description: 'Pick a environment to run tests')
        string(name: 'BRANCH_NAME', defaultValue: 'master', description: 'Branch to run tests from')
        string(name: 'TEST_FILE', defaultValue: 'src/tests/Saucedemo', description: 'Specific Playwright test file or folder.')
    }

    // triggers {
    //     cron('')
    // }

    stages {
        stage('Checkout') {
            steps {
                git url: "https://github.com/cuongnguyen261298/automation-playwright.dev.git", 
                branch: "${params.BRANCH_NAME}",
            }
        }
        stage('Installing deps') {
            steps {     
                sh """
                    npm ci 
                    npx playwright install --with-deps chromium
                    npx playwright install --with-deps chrome
                """
            }
        }
        stage('Running tests') {
            steps {
              catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                script {
                    echo "Environment: ${params.TEST_ENVIRONMENT}"
                    sh """
                      RUN_REPORT=${PLAYWRIGHT_REPORT} \
                      RUN_ENV=${params.TEST_ENVIRONMENT} \
                      npx playwright test ${params.TEST_FILE} -c ci.playwright.config.ts
                    """
                }
              }
            }
        }
    }

    post {
        always {
            publishHTML (target: [
                allowMissing: true,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportFiles: 'index.html',
                reportName: 'Report by The Reporter'
          ])
        }
    }
}
