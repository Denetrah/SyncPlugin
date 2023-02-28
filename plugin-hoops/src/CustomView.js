
import React, {Component} from "react";
// import { FlexPlugin } from 'flex-plugin';
import { SyncClient } from 'twilio-sync';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default class CustomView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoursofOperation: {}
        }
    }
    componentDidMount() {
         // Initialize the Sync client
         this.syncClient = new SyncClient(this.props.token);
         // Fetch the Sync Map data
         this.syncClient.map('hours-of-operation').then(map => {
          this.map = map;
          // Subscribe to changes in the Sync Map data
          this.map.on('itemUpdated', event => {
           this.setState({
            hoursOfOperation: event.item.value
           });
          });
          // Get the current hours of operation data
          this.map.get().then(item => {
           this.setState({
            hoursOfOperation: item.value
           });
          });
         });
     }
     handleAddHoursOfOperation(day, startTime, endTime) {
         // Update the hours of operation data in the Sync Map
         this.map.set(day, { startTime, endTime }).then(item => {
          this.setState({
           hoursOfOperation: {
            ...this.state.hoursOfOperation,
            [day]: item.value
           }
          });
         });
        }
        render() {
            return (<div><h2>Add Hours of Operation</h2><select>
             {days.map(day => (<option key={day} value={day}>
              {day}</option>
             ))}</select><input type="text" placeholder="Start Time" /><input type="text" placeholder="End Time" /><button onClick={() => this.handleAddHoursOfOperation(/* day, startTime, endTime */)}>
             Add</button><hr /><h2>Hours of Operation</h2><ul>
             {Object.entries(this.state.hoursOfOperation).map(([day, hours]) => (<li key={day}>
              {day}: {hours.startTime} - {hours.endTime}</li>
             ))}</ul></div>
            );
           }
          }


    
// import React, {Component} from "react";
// import axios from 'axios'

// export default class CustomView extends Component {
//     state = {
//         friendlyName: '',
//         attributes: '',
//     }
//     handleInputChange = (event) => {
//         const target = event.target
//         const value = target.value
//         const name = target.name
//         this.setState({
//             [name]:value,
//         })
//     }
//     handleSubmit = (event) => {
       
//         event.preventDefault()
//         const {friendlyName, title} = this.state
//         console.log('friendlyName:',friendlyName)
//        console.log('attribbutes' , title)
//         axios 
//         .post('https://react-twilio-serverless-7634-dev.twil.io/CreateWorker',{
//             friendlyName,
//             title,
//         })
//         .then(res => {
//             console.log(res.data)
//             alert('New Worker Created')
//             this.setState({
//                 friendlyName: '',
//                 title:''
//             })
//         })
//         .catch(error => {
//             console.error(error)
//         })
//         // console.log(this.state)
        
//     }
//     render() {
        
        
//         return (

//             <form onSubmit={this.handleSubmit}>
//                 <div>
                 
//                     <label htmlFor="friendlyName">Friendly Name:</label>
//                     <input 
//                     type="text" 
//                     id="friendlyName"
//                     name="friendlyName" 
//                     placeholder="Enter Friendly Name"
//                     defaultValue=""
//                     onChange ={this.handleInputChange} />
//                    </div>

//                    <div>
//                     <label  htmlFor="title">Worker Attributes:</label>
//                     <textarea
//                     type= "text" 
//                     name="title" 
//                     placeholder="Enter worker Attributes"
//                     id= "title"
//                     defaultValue=""
//                     onChange={this.handleInputChange} />
//                 </div>
            
//             <button id="trigger" type="submit">Create Worker</button>
//             </form>
//         )
//     }
// }
