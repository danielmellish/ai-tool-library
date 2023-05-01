import * as React from "react"
import {Button, TextField} from '@mui/material'
import { Preloader, Grid } from 'react-preloader-icon';
import { v4 as uuidv4 } from 'uuid'
import Layout from '../components/Layout'

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
                />
                <br/>
                <br/> */}
                <TextField 
                  onChange={this.handleChange} 
                  name="text" 
                  label="Text to convert" 
                  variant="outlined" 
                  multiline
                  rows={20}
                  value={this.state.formData.text}
                  fullWidth
                />
                <br/>
                <br/>
              </div>}
              {this.state.submitted && !this.state.resultReceived &&
              <div>
                <Preloader
                use={Grid}
                size={60}
                strokeWidth={6}
                strokeColor="#262626"
                duration={2000}
                />
                <br />
              </div>}
              {this.state.submitted && this.state.resultReceived &&
              <div dangerouslySetInnerHTML={{__html: this.state.convertedText}} />
              }
              {!this.state.resultReceived &&
              <Button 
                variant="contained" 
                onClick={this.handleAPI}
                disabled={this.state.submitted}>
                Generate
              </Button>}
              {this.state.resultReceived &&
              <Button 
                variant="contained" 
                onClick={this.handleReset}>
                Reset
              </Button>}
            </Layout>
          </div>
      )
  }
}

export default IndexPage