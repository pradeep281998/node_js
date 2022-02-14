pipeline {
    agent any
    environment {
        registry = 'docker.io/pradeep281998/docfile'
        registryCredential = 'docker-hub-id'
        
        dockerImage = ''
    }
    
     stages {
        stage("Git Checkout") {
            steps {
                git credentialsId: 'eed97c7c-25ae-49e8-9fd7-81ee0b9a937a', url: 'https://github.com/pradeep281998/node_js.git'
            }
        }
        
        stage('Dockerfile true'){
            steps{
                
        echo 'docker file is there'
                
            }
            
        }
       


      stage('Building our image') {
            steps {
                script {
                    sh 'docker info'
                    dockerImage = docker.build registry + ":v$BUILD_NUMBER"
                }
            }
        }
    }
    
