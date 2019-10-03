import React from 'react';

export default class SingleS3func extends React.Component {
	constructor(props) {
		super(props);
		 this.state={

			"config"            : "",
	      	"uploadedImage"     : [],
	      	"imgPath"           : ""

  		};
	}
	  uploadDesignImg(e){
          console.log("upload =",e.target.files[0]);
          var file = e.target.files[0];
        this.setState({
          uploadedImage: e.target.files[0]
        },()=>{
          console.log("uploadToS3 =",this.state.uploadedImage);
           S3FileUpload
            .uploadFile(file,this.state.config)
            .then((Data)=>{
                console.log("S3 = ",Data);
                console.log("===>",Data.location);
              this.setState({
                imgPath:Data.location
              })
          })
          .catch((error)=>{
            console.log(error);
          })
        })

      }

	render() {
		return (
			<div>
				 <div className="formcontent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="contactNumber">Banner Image<span className="redFont"></span></label>
                    <div className="">
                      {/*<input id="input-b1" name="input-b1" type="file" class="file" data-show-preview="false" onChange={this.handleChange.bind(this)} required/>*/}
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                          {/*<label htmlFor="designImg" className="designLabel col-lg-12 col-md-12 col-sm-12 col-xs-12 row">Upload</label>*/}
                        <input type="file" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding row" title="Please choose image" id="designImg" onChange={this.uploadDesignImg.bind(this)} />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12  col-sm-2 marginTop17 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
                        { this.state.imgPath!=="" ? 
                          <img alt="selected design" src={this.state.imgPath} width="150" height="100"/>
                          : <div> </div>
                        }
                        </div>
                      </div>
                    </div>
			</div>
		);
	}
}
