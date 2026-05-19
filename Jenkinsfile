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
        choice(name: 'BROWSER', choices: ['chromium', 'webkit', 'firefox'], description: 'Pick a browser to run tests')
        string(name: 'BRANCH_NAME', defaultValue: 'develop', description: 'Branch to run')
        string(name: 'TEST_FILE', defaultValue: 'src/tests', description: 'Specific test file or folder')
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/cuongnguyen261298/automation-playwright-dev.git', branch: "${params.BRANCH_NAME}"
            }
        }

        stage('Installing deps') {
            steps {     
                sh """
                    npm ci
                    npx playwright install --with-deps ${params.BROWSER}
                """
            }
        }

        stage('Running tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    script {
                        echo "Environment: ${params.TEST_ENVIRONMENT}"
                        def testFile = params.TEST_FILE
                        def configFile = "ci.playwright.config.ts"
                        
                        sh """
                          npx playwright test ${testFile} -c ${configFile} --project=${params.BROWSER} --workers=3
                        """
                    }
                }
            }
        }
    }
}