pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/command-execution-app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Local Test') {
            steps {
                bat 'npm test'
            }
        }
        
        stage('Start Application') {
            steps {
                bat 'start /B node server.js > logs/server.log 2>&1'
            }
        }

        stage('Deploy to Windows Server') {
            steps {
                bat 'xcopy * \\\\windows-server\\deploy-folder /Y /E'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'logs/server.log', onlyIfSuccessful: true
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
