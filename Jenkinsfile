pipeline {
    agent {
        docker { 
            image 'node:23.11.0'
            args '-u root'
        }
    }
    environment {
        PLAYWRIGHT_REPORT = "The reporter"
    }

    parameters {
        choice(name: 'TEST_ENVIRONMENT', choices: ['develop', 'staging', 'production'], description: 'Pick a environment')
        string(name: 'BRANCH_NAME', defaultValue: 'develop', description: 'Branch to run')
        string(name: 'TEST_FILE', defaultValue: 'src/tests', description: 'Specific test file or folder')
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/cuongnguyen261298/automation-playwright-dev.git', branches: [[name: "${params.BRANCH_NAME}"]]
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
                          npx playwright test ${params.TEST_FILE} -c ci.playwright.config.ts
                        """
                    }
                }
            }
        }
        post {
            always {
                publishHTML(target: [
                    reportFiles: 'index.html',
                    reportName: 'Report by The Reporter'
                ])
            }
        }

    }
}