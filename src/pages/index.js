import * as React from "react"
import {Button, TextField} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import Layout from '../components/Layout'
import LoadingIcons from 'react-loading-icons'
import *  as globalStyles from '../styles/global.module.scss'
import LoadingBar from '../components/LoadingBar'

class IndexPage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        formData: {
          // email: '',
          text: '',
        },
        submitted: false,
        resultReceived: false,
        convertedText: ''
      }
      this.handleAPI = this.handleAPI.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleReset = this.handleReset.bind(this)
  }

  async handleAPI() {
    
    const AWS = require("aws-sdk")
    AWS.config.update({
      region: "ap-southeast-2",
      accessKeyId: 'AKIA6PLPBIFHBX2WDL7E',
      secretAccessKey: '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',
    })
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const newRequestID = uuidv4()

    const params = {
      TableName: "contentGenerator",
      Item: {
        requestID: newRequestID,
        text: this.state.formData.text
      }
    }

    const itemParams = {
      TableName: "contentGenerator",
      Key: {'requestID': newRequestID}
    }

    dynamodb.put(params, async (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Update the component state to reflect that the data was submitted
        this.setState({
          ...this.state,
          submitted: true
        })
    
        // Wait 10 seconds before starting to read the data from DynamoDB
        setTimeout(async () => {
          const intervalID = setInterval(async () => {
            try {
              // Read the data from DynamoDB
              const data = await dynamodb.get(itemParams).promise()
              
              // Check if the 'gptoutput' attribute exists in the data
              if (data.Item.gptoutput) {

                // Update the component state to reflect that the result was received
                this.setState({
                  ...this.state,
                  resultReceived: true,
                  convertedText: data.Item.gptoutput
                })
                
                // Stop reading the data from DynamoDB
                clearInterval(intervalID)
              }
            } catch (error) {
              // Handle any errors that might occur during the execution of the 'dynamodb.get()' method
              console.log(error)
            }
          }, 5000)
        }, 10000)
      }
    })
  }

  // Handle change in a textfield
  handleChange(event) {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    })
  }

  // Handle press of reset button
  handleReset(event) {
    this.setState({
      ...this.state,
      submitted: false,
      resultReceived: false,
      formData: {
        email: '',
        text: '',
      }

    })
  }

  render() {
      return (
          <div>
            <Layout>
              {!this.state.submitted && !this.state.resultReceived &&
              <div>
                {/* <TextField 
                  onChange={this.handleChange} 
                  name="email" 
                  label="Email" 
                  variant="outlined" 
                  value={this.state.formData.email}
                  fullWidth
                  className={globalStyles.toolTextField}
                />*/}
                <h1 className={globalStyles.toolHeader}>Newsletter Generator</h1>
                <h3 className={globalStyles.toolSubHeader}>Insert your news release into the field below. We'll generate a newsletter for you.</h3>
                <TextField 
                  onChange={this.handleChange} 
                  name="text" 
                  label="Enter the news release here" 
                  variant="outlined" 
                  multiline
                  rows={20}
                  value={this.state.formData.text}
                  fullWidth
                  className={globalStyles.toolTextField}
                />
                <div className={globalStyles.toolSubmitButtonContainer}>
                  <Button 
                    variant="contained" 
                    onClick={this.handleAPI}
                    disabled={this.state.submitted}>
                    Generate newsletter
                  </Button>
                </div>
              </div>}
              {this.state.submitted && !this.state.resultReceived &&
              <div className={globalStyles.toolLoadingContainer}>
                <LoadingIcons.Bars 
                stroke = '#189AB4'
                fill="#189AB4"
                className={globalStyles.toolLoadingAnimation}
                />
                <p className={globalStyles.toolLoadingText}>Generating your newsletter</p>
                <div className={globalStyles.toolLoadingBarContainer}>
                  <LoadingBar />
                </div>
              </div>}
              {this.state.submitted && this.state.resultReceived &&
              <div dangerouslySetInnerHTML={{__html: this.state.convertedText}} />
              }
              {this.state.resultReceived &&
              <div className={globalStyles.toolResetButtonContainer}>
                  <Button 
                  variant="contained" 
                  onClick={this.handleReset}>
                  Reset
              </Button>
              </div>}
            </Layout>
          </div>
      )
  }
}

export default IndexPage