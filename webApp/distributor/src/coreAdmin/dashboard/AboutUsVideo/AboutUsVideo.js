import React, { Component } from 'react';
import $ from "jquery";
import './AboutUsVideo.css'

import axios                      from 'axios';
import swal                       from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';


import ReactPlayer from 'react-player'

export default class sendYoutubeUrl extends Component {
     constructor(props){
    super();
      this.state ={
        "videoData"   :[],
        "url"   :[],
      }
  }
  
  componentDidMount(){
    this.getUrl()
    console.log("getUrl",this.getUrl());
  }
  
  getUrl(){
    axios.get("api/uploadVideoUrl/get/list")
          .then((response) =>{
            console.log("response getUrl",response);
            this.setState({
              videoData :response.data
            })
        })
        .catch((error) =>{
          console.log("error",error);
        });
  }
    render(){
      // console.log("link",this.VideoData());
        return(
        <div className="pagewrapper">           
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray mb50 researchpage">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 nopadding ">
              <div className="col-lg-12 ">
                <div className="col-lg-6 ">
                  <h4 className="pageheading">Tools Uploaded</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mb50">
              {
                this.state.videoData.map((data, index)=>
                {
                  return(
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding marginSet">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 green marginSet">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           <ReactPlayer url={data.url} width='347px' height='170px' target="_blank" controls loop  />
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setSize">
                              { 
                                data.fileUpload 
                                  ?
                                  (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                                    ?
                                      <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                        <img src="/images/pdf.png" height="100" width="90"/><br/>
                                      </a>
                                    :
                                      <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                        <img src="/images/ppt.png" height="100" width="100"/><br/>
                                      </a>

                                  : null
                                }
                              </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setText">
                            <h5>Stock Market Basics</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 green marginSet">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <ReactPlayer url={data.url} width='346px' height='170px' target="_blank" controls loop data-url={data.url}  />
                            
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setSize">
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setText">
                              <h5>Wealth Management</h5>    
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 green marginSet">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setFile">
                          { 
                            data.fileUpload 
                              ?
                              (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                                ?
                                  <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                    <img src="/images/pdf.png" height="100" width="90"/><br/>
                                  </a>
                                :
                                  <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                                    <img src="/images/ppt.png" height="100" width="90"/><br/>
                                  </a>

                            : null
                          }
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 setText">
                            <h5>Convince Client</h5>    
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>  
          </div>  
              

{/*        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Stock Market Basics</th>
                <th>Wealth Management</th>
                <th>Convince Client</th>
              </tr>
            </thead>
              <tbody>
             {
              this.state.videoData && this.state.videoData.length > 0
              ?
              this.state.videoData.map((data, index)=>{
              return(
              <tr key={index}>
                <td className="setM">
                  <div className="setWidth">
                   <ReactPlayer url={data.url} width='100px' height='70px' target="_blank" controls loop  />
                  </div>
                  <div>
                    { 
                      data.fileUpload 
                        ?
                        (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                          ?
                            <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                              <img src="/images/pdf.png" height="50" width="50"/><br/>
                            </a>
                          :
                            <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                              <img src="/images/ppt.png" height="50" width="50"/><br/>
                            </a>

                        : null
                    }

                  </div>
                </td>
                <td className="setM">
                  <div className="setWidth">
                   <ReactPlayer url={data.url} width='100px' height='70px' controls loop  />
                  </div>
                  <div>
                     
                  </div>
                </td>
                <td>
                  { 
                    data.fileUpload 
                      ?
                      (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "pdf" || (data.fileUpload ? data.fileUpload.split('.').pop() : "") === "PDF" 
                        ?
                          <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                            <img src="/images/pdf.png" height="50" width="50"/><br/>
                          </a>
                        :
                          <a title="Click to View"  target="_blank" href={data.fileUpload}> 
                            <img src="/images/ppt.png" height="50" width="50"/><br/>
                          </a>

                      : null
                  }
                </td>
              </tr>
            )
              })
              :
            <tr> 
              <td colSpan="13"> Sorry... No Data available! </td>
            </tr>
          }
             
            </tbody>
            </table>

        </div>*/}
        </div>
      </div>
      

        );
    }
}