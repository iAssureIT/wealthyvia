import React, { Component }               from 'react';
import $                                  from 'jquery';
import swal                               from 'sweetalert';
import axios                              from 'axios';
import S3FileUpload                       from 'react-s3';
import "./Header.css";
var array        = [];
var answersarray = []; 

export default class Header extends Component {

  constructor(props) {
    super(props);
        this.state = {
            "userinfo"            : {},
            "productDetailsArray" : [],
            "name"                : "",
            "panNumber"           : "",
            "panNumberName"       : "",
            "panNumberLocation"   : "",
            "email"               : "",
            "addressProof"        : "",
            "addressProofName"    : "",
            "contactNumber"       : "",
            "addressProofLocation": "",

            "fields"             : {},
            "errors"             : {},  
            "fields1"            : {},
            "errors1"            : {},
            "questionsArray"     : [],
            "answersArray"       : [],
            "answersofQ1"        : [],
            "Question1"          : "1) What is the primary goal for the funds invested through WealthyVia?",
            "Question2"          : "2) Any near term need for the funds invested with us ?",
            "Question3"          : "3) Your investments % exposure of your investable capital can be best described as",
            "Question4"          : "4) What is number of years you have spent in stock market investments",
            "Question5"          : "5) What is your biggest drawdown on your entire portfolio ?",
            "modalsubmitbtn"     : 'Submit'

        };
  }
  ScrollTop(event){
    window.scrollTo(0,0);
  }
  logout(){
    localStorage.setItem("user_ID", "")
    window.location.reload();  
  }
  validateFormReq() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "This field is required.";
    }   
    if (!fields["panNumber"]) {
      formIsValid = false;
      errors["panNumber"] = "This field is required.";
    }
    if (!fields["addressProof"]) {
      formIsValid = false;
      errors["addressProof"] = "This field is required.";
    }
 
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "This field is required.";
    }          
 
     if (!fields["contactNumber"]) {
      formIsValid = false;
      errors["contactNumber"] = "This field is required.";
    }
     
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please enter valid email-ID.";
      }
    }
    if (typeof fields["contactNumber"] !== "undefined") {
      if (!fields["contactNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["contactNumber"] = "Please enter valid mobile no.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }
  componentDidMount()
    {

      $('.dropdown-radio').find('input').change(function() {
      var dropdown = $(this).closest('.dropdown');
      var radioname = $(this).attr('name');
      var checked = 'input[name=' + radioname + ']:checked';
      
      //update the text
      var checkedtext = $(checked).closest('.dropdown-radio').text();
      dropdown.find('button').text( checkedtext );

      //retrieve the checked value, if needed in page 

    });
    const userid = localStorage.getItem('user_ID');
    if(userid){
      axios.get("/api/users/get/"+userid)
      .then((response)=>{ 
          this.setState({
              userinfo : response.data
          })

      })
      .catch((error)=>{
            console.log('error', error);
      })
    }
     
      /*userCount*/
       axios.get("/api/users/get/list/1")
      .then((userInfo)=>{ 
          this.setState({
              userCount : userInfo.data.length
          })
          console.log("userInfo",this.state.userCount);

      })
      .catch((error)=>{
            console.log('error', error);
      })
        axios
      .get('/api/projectsettings/get/S3')
      .then((response)=>{
        const config = 
                       {
                          
                          bucketName      : response.data.bucket,
                          dirName         : response.data.bucket,
                          region          : response.data.region,
                          accessKeyId     : response.data.key,
                          secretAccessKey : response.data.secret,
                      }
        this.setState({
          config : config
        })
      })
      .catch(function(error){
        console.log(error);
          if(error.message === "Request failed with status code 401")
              {
                   swal("Your session is expired! Please login again.","", "error");
                   this.props.history.push("/");
              }
      })
  }
  getData(){
    const userid = localStorage.getItem('user_ID');
    if(userid){
      axios.get("/api/users/get/"+userid)
      .then((response)=>{ 
          this.setState({
              userinfo : response.data
          })
      })
      .catch((error)=>{
            console.log('error', error);
      })
    }
    

    axios.get("/api/carts/get/count/"+userid)
      .then((response)=>{ 
          this.setState({
              count : response.data
          })
          // this.props.redirectToPropertyDetails(response.data)
      })
      .catch((error)=>{
            console.log('error', error);
      })
  }
  backButton(event){
    event.preventDefault();
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');
    $("#myModalHeader").show();
    $("#myModalHeader").addClass('in'); 
  }
  SubmitFirst(event){
    event.preventDefault();
    $("#myModalHeader").hide();
    $("#myModalHeader").removeClass('in');
    $("#riskformHeader").show();
    $("#riskformHeader").addClass('in');
  }
  SubmitSecondModal(event){
    event.preventDefault();
    event.preventDefault();
    if(this.state.questionsArray.length<5)
    {
      this.setState({
        compalsaroy : false,
      })
    }else{
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');

    $("#kycModalHeader").show();
    $("#kycModalHeader").addClass('in');
    }
  }
  handleChange(event){
    this.setState({
      "name"             : this.refs.name.value,
      "contactNumber"    : this.refs.contactNumber.value,
      "email"            : this.refs.email.value,
      "panNumber"      : this.refs.panNumber.value,
      "addressProof"      : this.refs.addressProof.value,
    });
   let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    if (this.validateForm() && this.validateFormReq()) {
      let errors = {};
      errors[event.target.name] = "";
      this.setState({
        errors: errors
      });
    }
  }
  checkSizePAN(event){
    var file = event.target.files[0];
    if(file){
       if(file.size>2097152){
          swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
          event.target.value ="";
       }else{
          this.setState({
              "panNumber"      :event.target.value,
            });
      }
    }
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    if (this.validateForm() && this.validateFormReq()) {
      let errors = {};
      errors[event.target.name] = "";
      this.setState({
        errors: errors
      });
    }
       var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
          panNumberName : newFile.name,
      })
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ){ 
          if (newFile) {
            if(this.state.panNumber===""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    panNumberLocation : Data.location,
                  })
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            this.setState({
                              panNumberLocation : Data.location,
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }
  CloseModalTwo(event){
    $("#riskformHeader").hide();
    $("#riskformHeader").removeClass('in');
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
  }
  checkSize(event){
    var file = event.target.files[0];
    if(file){
       if(file.size>=2097152)
       {
          swal("Warning!", "File size should not be greater than 2 MB..!", "warning")
          event.target.value ="";
       }else{
          this.setState({
              "addressProof"  : event.target.value,
            });
          }
    }
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    if (this.validateForm() && this.validateFormReq()) {
      let errors = {};
      errors[event.target.name] = "";
      this.setState({
        errors: errors
      });
    }
    
     var index = event.target.getAttribute('id');
    let self = this;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var file = event.currentTarget.files[0];
      var newFileName = JSON.parse(JSON.stringify(new Date()))+"_"+file.name;
      var newFile = new File([file],newFileName);
      this.setState({
          addressProofName : newFile.name,
      })
      if (newFile) {
        var ext = newFile.name.split('.').pop();
        if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG" ||  ext==="PDF" ||  ext==="pdf" ){ 
          if (newFile) {
            if(this.state.addressProof===""){
              S3FileUpload
                .uploadFile(newFile,this.state.config)
                .then((Data)=>{ 
                  this.setState({
                    addressProofLocation : Data.location,
                  })
                  this.deleteimageLogo(index)
                })
                .catch((error)=>{
                  console.log(error);
                })
            }else{
              swal({
                    title: "Are you sure you want to replace this image?",
                    text: "Once replaced, you will not be able to recover this image!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((success) => {
                      if (success) {
                        S3FileUpload
                          .uploadFile(newFile,this.state.config)
                          .then((Data)=>{
                            this.setState({
                              addressProofLocation : Data.location,
                            })
                            this.deleteimageLogo(index)
                          })
                          .catch((error)=>{
                            console.log(error);
                          })
                      } else {
                      swal("Your information is safe!");
                    }
                  });
            }         
          }else{         
            swal("File not uploaded","Something went wrong","error"); 
          }    
        }else{
          swal("Format is incorrect","Only Upload images format (jpg,png,jpeg)","warning");  
        }
      }
    }
  }
  Submit(event){
    event.preventDefault();
      if (this.validateForm() && this.validateFormReq()) {
       
        var dataArray1={
          "name"             : this.refs.name.value,
          "addressProof"     : this.refs.addressProof.value,
          "panNumber"        : this.refs.panNumber.value,
          "email"            : this.refs.email.value,
          "contactNumber"    : this.refs.contactNumber.value,
        }
        if(dataArray1){
          var adminEmail = "kycwealthyvia@gmail.com";
          const dataArray = {
              "email"         : this.state.email ,
              "subject"       : "Your KYC details is sent successfully.",
              "message"          : "", 
              "mail"          : 'Dear  ' + this.state.name + ', <br/><br/>'+
                                "Congratulations!<br/><br/>Your KYC details has been successfully delivered to the admin! <br/> We will get back to you shortly. <br/> <br/> " + 
                                "<b>Details Submitted - </b><br/> Name: "  + this.state.name + '<br/>'+
                                "Contact Number :" + this.state.contactNumber + '<br/>'+
                                "Email :" + this.state.email + '<br/>'+
                                "<br/><br/> Thank You, <br/> Support Team, <br/> www.wealthyvia.com " ,

          };
          axios
          .post('/send-email',dataArray)
          .then((res)=>{
             if(res.status === 200){
              const formValues2 = {
                "email"         : adminEmail ,
                "subject"       : "New KYC/Investment Profile details arrived from client!",
                "mail"          : 'Dear Admin, <br/>'+
                                  "New KYC details came from client. <br/> <br/>Details are as follows -<br/> <br/>" + 
                                  "<b> Name: </b>"   + dataArray1.name + '<br/>'+
                                  "<b> Email: </b>"  + dataArray1.email + '<br/>'+
                                  "<b> Contact Number: </b>"  + dataArray1.contactNumber + '<br/><br/>'+
                              
                                  "<b> Investment Profile details </b> <br/><br/>"+
                                  ""+this.state.questionsArray[0]+"<br/>"+
                                  "Ans : "+this.state.answersofQ1+"<br/><br/>"+ 
                                  ""+this.state.questionsArray[1]+"<br/>"+
                                  "Ans : "+this.state.answersofQ2+"<br/><br/>"+ 
                                  ""+this.state.questionsArray[2]+"<br/>"+
                                  "Ans : "+this.state.answersofQ3+"<br/><br/>"+
                                   ""+this.state.questionsArray[3]+"<br/>"+
                                  "Ans : "+this.state.answersofQ4+"<br/><br/>"+
                                  ""+this.state.questionsArray[4]+"<br/>"+
                                  "Ans : "+this.state.answersofQ5+"<br/><br/>"+
                                  "" ,
                 "attachments" : [{
                  "name" : this.state.panNumberName,
                  "path" : this.state.panNumberLocation
                    },
                    {
                  "name" : this.state.addressProofName,
                  "path" : this.state.addressProofLocation
                    },
                  ]

              };
              axios
              .post('/send-email',formValues2)
              .then((res)=>{
                        if(res.status === 200){
                             swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                        }
                      })
                      .catch((error)=>{
                        console.log("error = ", error);
                        
                      });
              }
          })
          .catch((error)=>{
            console.log("error = ", error);
          });
          let fields = {};
          fields["panNumber"]     = "";
          fields["addressProof"]     = "";
          fields["name"]            = "";
          fields["email"]           = "";
          fields["contactNumber"]   = "";
        
             this.setState({
            "panNumber"       : "",
            "addressProof"      : "",
            "name"             : "",
            "email"            : "",
            "contactNumber"    : "",
           
            "fields"           : fields
          });
          $("#kycModalHeader").hide();
        $("#kycModalHeader").removeClass('in');
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
      }
    }
  }

  
  handleChange1(event){
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value
        });
       
        let fields1 = this.state.fields1;
      fields1[event.currentTarget.name] = event.currentTarget.value;
      this.setState({
        fields1
      });
      if (this.validateFormModal() ) {
        let errors1 = {};
        errors1[event.currentTarget.name] = "";
        this.setState({
          errors1: errors1
        });
      }
    }

    validateFormModal() {
    let fields = this.state.fields1;
    let errors = {};
    let formIsValid = true;
      if (typeof fields["emailModal"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailModal"])) {
          formIsValid = false;
          errors["emailModal"] = "Please enter valid email-ID.";
        }
      }
      if (typeof fields["contactNumberModal"] !== "undefined") {
        if (!fields["contactNumberModal"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["contactNumberModal"] = "Please enter valid mobile no.";
        }
      }
     
      this.setState({
        errors1: errors
      });
      return formIsValid;
  } 

  validateFormReqModal() {
    let fields = this.state.fields1;
    let errors = {};
    let formIsValid = true;
      
        if (!fields["nameModal"]) {
        formIsValid = false;
        errors["nameModal"] = "This field is required.";
      }     
     
        if (!fields["emailModal"]) {
        formIsValid = false;
        errors["emailModal"] = "This field is required.";
      }          
   
       if (!fields["contactNumberModal"]) {
        formIsValid = false;
        errors["contactNumberModal"] = "This field is required.";
      }
       
      this.setState({
        errors1: errors
      });
      return formIsValid;
  }

    SubmitEnquire(event){
    event.preventDefault();
    if (this.validateFormModal() && this.validateFormReqModal()) {
      this.setState({
          modalsubmitbtn : 'We are processing...',
        });
       
       /* ======================= Send Email to user ==================================*/
      var adminEmail = "kycwealthyvia@gmail.com";
      const dataArray = {
          "email"         : this.state.emailModal ,
          "subject"       : "Welcome to Wealthyvia : about your query",
          "message"       : "", 
          "mail"          : '<div style="color:#000">Dear Valued Investor <br/><br/>'+
                            "Thank you for submitting your query. Our team will get back to you shortly. <br/> " + 
                            "<h4>Greetings!!! :) </h4>"+
                            "Very warm welcome to <a href='https://wealthyvia.com/'>https://wealthyvia.com/</a>  and heartfelt thanks for reading our blog posts. <br/><br/>"+
                            "We are sure that you have a great desire for wealth creation and you might be already working on it. We would like to assure you that Stock Market is definitely a place to benefit you the most if you act wisely and rightly with your investments. <br/><br/>"+
                            "1. Market goes through number of cycles and always some of leading companies of bull market create maximum wealth. These companies have all great factors positive for them for their growth and their efficient management can make wonders when those opportunities are on. However to select these companies and investing in them <b>with high conviction</b> and also <b>exiting them</b> after multiple quarters or years of growth <b>at the right time and price</b> becomes important so as to protect capital and its high gains and thereafter participate in next cycle.<br/><br /> "+
                            "2. Investing in high quality, good growth, high integrity management and enough catalysts presence: all these parameters <b>qualifying 8-12 stocks</b> as per one's comfort is enough diversification for a portfolio. Ove diversification dilutes returns and excessive concentration can increase the risk. <br/><br/>"+
                            "3. Money comes from <b>sizing.</b> Investing good enough capital in each of stocks is important else even after having high % growth, absolute amount will not make much difference to you.<br/><br/> "+
                            "At <b>Wealthyvia</b> we have created  full-fledged frameworks and models that increase your chances of being right and by large quantum in market. With these frameworks we have created two portfolios in Indian markets named <br/><br/>"+
                            "<a href='http://wealthyvia.com/offerings/5gcpm'><b>5GCPM:</b></a> High growth mid-cap stocks that can become large caps and some of which may even multi fold over next 3-4 years. 5 types of growth, Corporate governance, practicability of things working out in their business game favor and magic indicators based on fundamentals , technical , macros and market perception towards stock are the factors that make this strong framework that has generated amazing returns over the last 7 years. Details about framework are here in this <a href='http://wealthyvia.com/blog/why-you-need-5gcpm-like-framework-to-succeed-in-stock-investments'>Blogpost</a> and https://wealthyvia.com/offerings/5gcpm <br/><br/>"+
                            "<a href='https://wealthyvia.com/offerings/superFocused'><b>Super Focus :</b></a>  For a concentrated investor, focus has to be on relative opportunities in a few stocks with very high growth  possibility in top line &    bottom line for next several quarters. A tactical investment strategy on a concentrated portfolio and prudent risk management have high potential to    generate consistent High CAGR. Higher the Conviction and higher the strength and continuation, Higher should be the allocation. Returns are most dependent variable on Risk Reward and position sizing! This is a star product of Wealthyvia with best concentrated high growth sustenance bets irrespective of market cap category. Backed by 5GCPM framework but focus of high growth with concentration and risk reward , it delivered amazing    consistent <a href='https://wealthyvia.com/offerings/superFocused#productchart'>CAGR</a>.   https://wealthyvia.com/offerings/superFocused <br/><br/>"+
                            "<a href='http://wealthyvia.com/offerings/USAStocks'><b>US listed stocks :</b></a>  While Indian market does have good opportunities it's mostly inward economy and consumption market. In today's changed Era , one can not afford to lose out on opportunities in the first , biggest or most different companies present in World's biggest market 'USA' with the best of technology , unique innovative business model companies. With detailed study we have created best of companies portfolio 'US listed stocks' listed on NYSE. With most ease you can now invest in American companies like Google, Amazon types or even next big things. We provide you a platform to invest there at zero brokerage. Our research and stock selection framework can best serve you portfolio of right companies. Please find details here. http://wealthyvia.com/offerings/USAStocks <br/><br/>"+
                            "<a href='http://wealthyvia.com/offerings/unlistedStocks'><b>Unlisted high liquidity proven companies before IPO :</b></a>  In market earliest buyer in good company always makes the most and it's the reason most of IPO today of great companies get listed at very high price. What if one gets them before IPO in own DEMAT account? We provide such shares to you from unlisted space only after choosing them well with our detailed research, plant visits or primary surveys.<br/><br/> "+
                            "<span style='text-decoration:underline'>Please feel free to write to us about anything that you need to know about investments and these products.</span> You can also avail your existing portfolio review facility at the bottom of our website.<br/><br/> "+
                            "Also let us know suitable time to have a great conversation with you about wealth and ways forward over phone call. It will be a great pleasure to connect.<br/><br/> "+
                            "Thanking you <br/>"+
                            "Yours sincerely & profitably <br/>"+
                            "<b>Team Wealthyvia</b> "+
                            "<br/> www.wealthyvia.com </div>" ,
        };
      
       axios
        .post('/send-email',dataArray)
        .then((res)=>{
                   if(res.status === 200){
                      swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                    }
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       const formValues2 = {
        "email"         : adminEmail ,
        "subject"       : "New query/feedback arrived from Website!",
        "message"       : "",
        "mail"          : 'Dear Admin, <br/>'+
                          "Following new query/feedback came from website! <br/> <br/> " + 
                          "<br/>User Details <br/> " + 
                          "<b>Name: </b>"   + this.state.nameModal + '<br/>'+
                          "<b>Email: </b>"  + this.state.emailModal + '<br/>'+
                          "<b>Contact Number: </b>"  + this.state.contactNumberModal + '<br/><br/>'+
                          "<br/><br/> " ,

        };
        axios
        .post('/send-email',formValues2)
        .then((res)=>{
                  if(res.status === 200){
                   swal("Thank You!", "Our team will get in touch with you shortly..!", "success")
                  }
                   let fields1 = {};
                   fields1["nameModal"]            = "";
                   fields1["emailModal"]           = "";
                   fields1["contactNumberModal"]   = "";
                    $("#EnquireModal").hide();
                    $("#EnquireModal").removeClass('in');
                    $(".modal-backdrop").remove();
                    $("body").removeClass("modal-open");
                      this.setState({
                        "nameModal"            : "",
                        "emailModal"            : "",
                        "contactNumberModal"    : "",
                        "fields1"               : fields1,
                        "modalsubmitbtn"        : "Submit"
                      });
                })
                .catch((error)=>{
                  console.log("error = ", error);
                  
                });
       /* ======================= Send Email to user ==================================*/
      
      }
  }

  /*get checkbox value*/  
  getCheckValue(event){
    var checked = event.target.checked;
    if(checked){
      var value = event.target.value;
      
         array = this.state.questionsArray;
        if(array){

          
          if(this.state.questionsArray.indexOf(event.target.name)=== -1)
          {
            array.push(event.target.name);

            this.setState({
              questionsArray  :array,
            },()=>{
            })
          }
            answersarray.push(event.target.value);
          if(event.target.name === "1) What is the primary goal for the funds invested through WealthyVia?")
          {
            this.setState({
              answersofQ1    : answersarray,
            },()=>{
            })
          }else  if(event.target.name === "2) Any near term need for the funds invested with us ?"){
            this.setState({
              answersofQ2    : event.target.value,
            },()=>{
          
          })
          }
          else  if(event.target.name === "3) Your investments % exposure of your investable capital can be best described as"){
            this.setState({
              answersofQ3    : event.target.value,
            },()=>{
          })
          }
           else  if(event.target.name === "4) What is number of years you have spent in stock market investments"){
            this.setState({
              answersofQ4    : event.target.value,
            },()=>{
        })
          }
          else {
            this.setState({
              answersofQ5    : event.target.value,
            },()=>{
          })
        }
      }
    }else{
      this.setState({
        [event.target.name] : "",
      })
    }
  }
  ClosemyModalHeader(){
    $("#kycModalHeader").hide();
    $("#kycModalHeader").removeClass('in');
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
  }
  deleteimageLogo(index){
    var data = index.split("/");
    var imageName = data[4];
      if(index){
        S3FileUpload
          .deleteFile(imageName,this.state.config)
          .then((response) =>{
            swal("Image deleted successfully");
          })
          .catch((err) => {
            console.error("Not-Deletedddd...",err)
          })
      }
  }
  render() {
    const token = localStorage.getItem("user_ID");
    if( this.state.userinfo.fullName){
      const var1 =  this.state.userinfo.fullName.split(' ');
      var firstLetterF = var1[0].charAt(0);
      var firstLetterL = var1[1].charAt(0);
    }
    console.log("Page after deployment");
      return (
        <div className="row headerrwcontain">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 h1zindex">
              <div className="row">
                  <div className="modal fade in " id="myModalHeader" role="dialog">
                      <div className="modal-dialog modal-lg customModalRP" >
                          <div className="modal-header textAlignCenter modalHeaderCustom">
                            <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                            <h4 className="modal-title">Your Investment Profile</h4>
                          </div>
                           <div className="col-lg-12 col-md-12 hidden-xs hidden-sm modalBodyCustom " >
                            <form id="riskform">
                                <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>{this.state.compalsaroy ===false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                    <p id="Q1">{this.state.Question1} <span className="asterix">*</span></p>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                             <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>Pending
                                                <span className="centreDetaillistItem">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox" name={this.state.Question1} value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox"  name={this.state.Question1} value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                    <input type="checkbox" name={this.state.Question1} value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="centreDetailCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                          </div>
                                        </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                          <p><b>{this.state.Question2}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <div className="centreDetailContainer col-lg-1 row">
                                                      <input type="radio" name={this.state.Question2} value="Yes after two years" onChange={this.getCheckValue.bind(this)} required/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem">Yes after two years</span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                        <input type="radio" name={this.state.Question2} value="Yes after  6 -8 months" onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem">Yes after 6 -8 months</span>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                <div className="centreDetailContainer col-lg-1 row">
                                                        <input type="radio" name={this.state.Question2} value="It’s a separate capital to invest apart from my needs. I want to build good portfolio." onChange={this.getCheckValue.bind(this)}/>
                                                        <span className="radioCheck"></span>
                                                     </div>
                                                    <span className="centreDetaillistItem">It’s a separate capital to invest apart from my needs. I want to build good portfolio.</span>
                                            </div>                                            
                                        </div>
                                       
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 textAlignCenter">
                                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Next</div>
                                        </div>
                                    </form>
                                </div>
                                  {/*duplicate*/}
                                <div className="hidden-lg hidden-md col-sm-12 col-xs-12 modalBodyCustomSmall " >
                                    <form id="riskform">
                                    <label className="titileName">Please spend just 1 min to answer below . It helps us to serve you better!!</label>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                      <p><b>{this.state.Question1}</b><span className="asterix">*</span></p>
                                      <div className="">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                            <input type="checkbox"  name={this.state.Question1} value="15% is fine with me but don’t wanna lose at all . Safety first . Long term." onChange={this.getCheckValue.bind(this)} required />
                                            <span className="centreDetailCheck"></span>
                                          </div>
                                          <span className="centreDetaillistItem col-xs-9">15% is fine with me but don’t wanna lose at all . Safety first . Long term. </span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox" name={this.state.Question1} value="I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years" onChange={this.getCheckValue.bind(this)} />
                                                  <span className="centreDetailCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem col-xs-9">I am looking for multibagger stocks so that I can multi-fold my portfolio in 3 years</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox"  name={this.state.Question1} value="Just strong core portfolio with blue chips or mutual fund but ok to earn something extra." onChange={this.getCheckValue.bind(this)}/>
                                                  <span className="centreDetailCheck"></span>
                                               </div>
                                              <span className="centreDetaillistItem col-xs-9">Just strong core portfolio with blue chips or mutual fund but ok to earn something extra.</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                <input type="checkbox"  name={this.state.Question1} value="I wanna allocate some portion to big tech giants like amazon facebook types too." onChange={this.getCheckValue.bind(this)} />
                                                <span className="centreDetailCheck"></span> 
                                             </div>
                                              <span className="centreDetaillistItem col-xs-9">I wanna allocate some portion to big tech giants like amazon facebook types too.</span>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                              <input type="checkbox" name={this.state.Question1} value="I am day trader, daily play with markets. I want continuous smart trades." onChange={this.getCheckValue.bind(this)}/>
                                              <span className="centreDetailCheck"></span>
                                            </div>
                                            <span className="centreDetaillistItem col-xs-9">I am day trader, daily play with markets. I want continuous smart trades.</span>
                                        </div>
                                      </div>
                                    </div> 
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                      <p><b>{this.state.Question2} </b><span className="asterix">*</span></p>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20">
                                       <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="Yes after two years" onChange={this.getCheckValue.bind(this)} required/>
                                          <span className="radioCheck"></span>
                                       </div>
                                      <span className="centreDetaillistItem col-xs-9">Yes after two years</span>
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                        <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="Yes after  6 -8 months" onChange={this.getCheckValue.bind(this)}/>
                                          <span className="radioCheck"></span>
                                        </div>
                                        <span className="centreDetaillistItem col-xs-9">Yes after 6 -8 months</span>
                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                        <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                          <input type="radio" name={this.state.Question2} value="It’s a separate capital to invest apart from my needs. I want to build good portfolio." onChange={this.getCheckValue.bind(this)}/>
                                          <span className="radioCheck"></span>
                                        </div>
                                        <span className="centreDetaillistItem col-xs-9">It’s a separate capital to invest apart from my needs. I want to build good portfolio.</span>
                                      </div>                                            
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt8 textAlignCenter">
                                      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right submitButtonRP" onClick={this.SubmitFirst.bind(this)}>Next</div>
                                    </div>
                                      </form>
                                    </div>  
                                </div>
                             </div>
                             <div className="modal fade in " id="riskformHeader" role="dialog">
                                <div className="modal-dialog modal-lg customModalRP hight400" >
                                  <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.CloseModalTwo.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Your Investment Profile</h4>
                                  </div>
                                  <div className="col-lg-12 col-md-12 hidden-xs hidden-sm ">
                                      <form id="riskform">
                                      {this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>{this.state.Question3}</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row ">
                                                      <input type="radio" name={this.state.Question3} value="FD/bonds/gold 80%, MF /direct equity 20%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                            <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                    <input type="radio" name={this.state.Question3} value="FD 60% , 30 %Gold, 10% bonds, no direct equity" onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>
                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="FD 10%, MF 25%, Direct equity 65%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="Direct equity 90%, FD 10%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className= "centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>{this.state.Question4}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="0-2 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="3-5 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="5 years plus" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="2-15 plus years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>{this.state.Question5}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                    <input type="radio" name={this.state.Question5} value="0 to -25%" onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                    <input type="radio" name={this.state.Question5} value="-25% to -50%" onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>
                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-51% to -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="More than -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">More than -75%</span>

                                          </div> 
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                             <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right submitButtonRP" onClick={this.SubmitSecondModal.bind(this)}>Submit</div>
                                          <div className="col-lg-2  col-md-2 col-sm-2 col-xs-2  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
                                            
                                               
                                        </div>
                                      </form>
                                    </div>
                                  {/*Duplicate*/}
                                     <div className="hidden-md hidden-lg col-sm-12 col-xs-12 modalBodyCustomSmall">
                                      <form id="riskform">
                                      {this.state.compalsaroy === false ? <span className="errorMsg pull-right">All questions are mandatory</span>: null}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                                            <p><b>{this.state.Question3}</b><span className="asterix">*</span></p>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question3} value="FD/bonds/gold 80%, MF /direct equity 20%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">FD/bonds/gold 80%, MF /direct equity 20% </span>

                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question3} value="FD 60% , 30 %Gold, 10% bonds, no direct equity" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 60% , 30 %Gold, 10% bonds, no direct equity</span>

                                          </div>
                                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="FD 10%, MF 25%, Direct equity 65%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">FD 10%, MF 25%, Direct equity 65%.</span>

                                          </div>   
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-1 col-xs-3 row">
                                                      <input type="radio"  name={this.state.Question3} value="Direct equity 90%, FD 10%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">Direct equity 90%, FD 10%.</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b> {this.state.Question4}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="0-2 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">0-2 years  </span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="3-5 years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">3-5 years</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                    <input type="radio" name={this.state.Question4} value="5 years plus" onChange={this.getCheckValue.bind(this)}/>
                                                    <span className="radioCheck"></span>
                                                 </div>
                                                <span className="centreDetaillistItem col-xs-9">5 years plus</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question4} value="2-15 plus years" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">2-15 plus years</span>

                                          </div>            
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                                            <p><b>{this.state.Question5}</b><span className="asterix">*</span></p>
                                            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                     
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="0 to -25%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9 ">0 to -25%</span>

                                          </div>
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-25% to -50%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem  col-xs-9">-25% to -50%</span>

                                          </div>
                                           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="-51% to -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">-51% to -75%</span>

                                          </div>   
                                          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
                                              <div className="centreDetailContainer col-lg-2 col-xs-3 row">
                                                      <input type="radio" name={this.state.Question5} value="More than -75%" onChange={this.getCheckValue.bind(this)}/>
                                                      <span className="radioCheck"></span>
                                                   </div>
                                                  <span className="centreDetaillistItem col-xs-9">More than -75%</span>

                                          </div> 
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 inputContainerRP textAlignCenter">
                                             <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 pull-right submitButtonRP" onClick={this.SubmitSecondModal.bind(this)}>Submit</div>
                                          <div className="col-lg-2  col-md-2 col-sm-4 col-xs-4  submitButtonRP" onClick={this.backButton.bind(this)}>Back</div>
                                            
                                               
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                             <div className="modal fade in " id="kycModalHeader" role="dialog">
                                <div className="modal-dialog modal-lg customModalKYC " >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.ClosemyModalHeader.bind(this)}> <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">KYC Form</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                      <form>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Name</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="text" className="customInputKF inputBox nameParts" id="name" name="name" placeholder="Enter Name" ref="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                                               <div className="errorMsg">{this.state.errors.name}</div>

                                              </div>

                                          </div>

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row"> 
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Mobile Number</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <input type="number" className="customInputKF inputBox nameParts" name="contactNumber" placeholder="Enter Mobile Number" ref="contactNumber" value={this.state.contactNumber} onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors.contactNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Email ID</label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="email" className="customInputKF inputBox nameParts" name="email" placeholder="Enter Email ID" ref="email" value={this.state.email}  onChange={this.handleChange.bind(this)}/>
                                              <div className="errorMsg">{this.state.errors.email}</div>

                                              </div>
                                          </div>
                                        </div>
                                        
                                        
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>PAN <span className="fs10">(JPEG/PNG/PDF) </span></label><span className="asterix">*</span>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="panNumber"  ref="panNumber" onChange={this.checkSizePAN.bind(this)} />
                                                 <div className="errorMsg">{this.state.errors.panNumber}</div>

                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                          <div className="row">
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Adress Proof <span className="fs10">( Driving Licen/Passport/Aadhaar)(JPEG/PNG/PDF)</span> <span className="asterix">*</span></label>
                                              </div>
                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                   <input type="file" className="customInputKF inputBox nameParts" name="addressProof" placeholder="Enter Name" ref="addressProof" onChange={this.checkSize.bind(this)} />
                                                <div className="errorMsg">{this.state.errors.addressProof}</div>
           
                                             </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">
                                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs submitButton pull-right" onClick={this.Submit.bind(this)}>
                                              Submit
                                            </div>
                                             <div className="hidden-lg hidden-md col-sm-4 col-xs-4 submitButton mt50 pull-right" onClick={this.Submit.bind(this)}>
                                              Submit
                                            </div>
                                        </div>
                                      </form>
                                    </div>
                                </div>
                             </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="row">
                                <nav className="navbar marginZero customNavBarUpper backColorWhite colorP navbar-default  hidden-xs hidden-sm">
                                    <div className="container-fluid">
                                      <div className="navbar-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <a className="navbar-brand webSiteName colorP col-lg-3 col-md-3 col-sm-4 col-xs-4" href="/">
                                          <div className="col-lg-10 webSiteImage">
                                            <img src ="/images/WealthyVia_Logo.png" alt="" />
                                          </div>
                                        </a>
                                      <div className="col-lg-4 col-lg-offset-1 col-md-8 col-sm-8 col-xs-8"> <a className="navbar-brand colorP" href=""><b>SEBI Registration No. INH000005397</b></a></div>
                                      <div className="col-lg-4 col-md-10 col-sm-10 col-xs-12 iconContainerHeader">
                                        <div className="row">
                                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4  textAlignRight mr15 noPadding  pull-right ">
                                            <b>Users : </b><b className="fs19">{this.state.userCount ? (285+this.state.userCount) :285 } +</b>
                                          </div> 
                                        
                                          <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right">
                                           <a href="https://www.linkedin.com/in/wealthyvia-882512194" target="_blank"  rel="noopener noreferrer"><img src="/images/link.png" alt="" /></a>
                                          </div> 
                                          <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook pull-right">
                                            <a href="https://www.facebook.com/Wealthyvia-110661300391812" target="_blank"  rel="noopener noreferrer">  <img src="/images/face.png" alt="" /></a>
                                          </div>
                                           <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook pull-right ">
                                            <a href="https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.wealthyvia.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=Viawealthy&tw_p=followbutton" target="_blank"  rel="noopener noreferrer"><img src="/images/tweet.png" alt="" /></a>
                                          </div>
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                  </nav>
                              </div>
                        </div>    
                        <div className=" hidden-lg hidden-md col-sm-12 col-xs-12">
                          <div className="row">
                            <nav className="navbar marginZero customNavBarSmall navbar-default">
                                <div className="container-fluid">
                                  <div className="navbar-header">
                                    <a className="navbar-brand webSiteNameOther colorWhite hidden-lg hidden-md col-sm-6 col-xs-6" href="/">
                                      <img src ="/images/IMG-20191129-WA0007.jpg" alt=""  />
                                    </a>

                                    <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook ">
                                      <a href="https://www.linkedin.com/in/wealthyvia-882512194" target="_blank"  rel="noopener noreferrer" className="headersociallinksmb"><img src="/images/link.png" alt="" /></a>
                                    </div> 
                                    <div className="col-lg-1 col-md-3 col-sm-1 col-xs-1 faceBook ">
                                      <a href="https://www.facebook.com/Wealthyvia-110661300391812" target="_blank"  rel="noopener noreferrer" className="headersociallinksmb">  <img src="/images/face.png" alt="" /></a>
                                    </div>
                                     <div className="col-lg-1 col-md-2 col-sm-1 col-xs-1 faceBook">
                                      <a href="https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.wealthyvia.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=Viawealthy&tw_p=followbutton" target="_blank"  rel="noopener noreferrer" className="headersociallinksmb"><img src="/images/tweet.png" alt="" /></a>
                                    </div> 

                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navBar" aria-expanded="false" >
                                      <span className="sr-only">Toggle navigation</span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                    </button>

                                  </div>

                                  <div className="collapse navbar-collapse" id="navBar">
                                  { token ?
                                    <ul className="nav navbar-nav navbar-right customUlSmall">
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Articulations <span className="caret"></span>
                                        </a>                       
                                        <ul className="dropdown-menu customDropdownSmall">
                                            <a href="/AllBlogs">Arthavrudhhi Blogs</a>
                                            <a href="">Communique</a>
                                            <a href="/free-research-reports">Free Research Reports</a>
                                        </ul>
                                      </li>
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Offerings <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu customDropdownSmall " aria-labelledby="navbarDropdownMenuLink">
                                          <a  className="dropdown-item" href="/offerings/5gcpm">5GCPM</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenMoats">Safe Heaven Moats</a>
                                          <a className="dropdown-item" href="/offerings/superFocused">Super Focused</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenAlpha">Safe Heaven Stocks + Alpha</a>
                                         <a className="dropdown-item" href="#">Nifty Algo Trading</a>
                                          <a className="dropdown-item" href="/offerings/USAStocks">USA Stocks</a>
                                          <a className="dropdown-item" href="/offerings/unlistedStocks">Unlisted Stocks</a>
                                          <a className="dropdown-item" href="#">Multibagger</a>
                                        </ul>
                                      </li>
                                      <li className="dropdown">
                                        <a href="/about-us" >About Us </a>
                                      </li>
                                      {token ?
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.userinfo && this.state.userinfo.fullName ? <label className="customName"><i className="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</label>:"Login/Signup"}
                                          </a>
                                          <ul className="dropdown-menu customDropdownLogOut hidden-xs hidden-sm " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item col-lg-12" href=""><div className="ImgDiv col-lg-4 col-xs-4 col-sm-2">{firstLetterF}{firstLetterL}</div>&nbsp; &nbsp; {this.state.userinfo && this.state.userinfo.fullName ? <span className="mt20">{this.state.userinfo.fullName}</span>:null}</a>
                                            <hr/>
                                             <a className="dropdown-item  col-lg-7 col-xs-7 col-sm-7" href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a>
                                             <a className="dropdown-item  col-lg-5 col-xs-7 col-sm-7" href="/MyOrders"><span className="myprofileButton">My order</span></a>
                                             <a className="dropdown-item col-lg-6 row cursorPointer"  onClick={this.logout.bind(this)}><span className="logOutButton ">Logout</span></a>
                                            
                                          </ul>
                                          <ul className="dropdown-menu  hidden-md hidden-lg" aria-labelledby="navbarDropdownMenuLink">
                                              <a className="dropdown-item backColorWhite" href="/clientDashboard"><span className="myprofileButtonSmall">My Dashboard</span></a>
                                              <a className="dropdown-item backColorWhite " href="/MyOrders"><span className="myprofileButtonSmall">My Orders</span></a>
                                             <a className="dropdown-item backColorWhite cursorPointer" onClick={this.logout.bind(this)}><span className="myprofileButtonSmall">Logout</span></a>
                                             <a className="dropdown-item backColorWhite cursorPointer"  ><span className=" pull-right"></span></a>
                                           
                                          </ul>
                                        </li>
                                        :
                                      <li className="dropdown">
                                        <a href="/login">Login/Signup </a>
                                      </li>
                                      }
                                      
                                    </ul>
                                    :
                                    <ul className="nav navbar-nav navbar-right customUlSmall width50">
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Articulations <span className="caret"></span>
                                        </a>                       
                                        <ul className="dropdown-menu customDropdownSmall">
                                            <a href="/AllBlogs">Arthavrudhhi Blogs</a>
                                            <a href="">Communique</a>
                                            <a href="/free-research-reports">Free Research Reports</a>
                                        </ul>
                                      </li>
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Offerings <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu customDropdownSmall " aria-labelledby="navbarDropdownMenuLink">
                                          <a  className="dropdown-item" href="/offerings/5gcpm">5GCPM</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenMoats">Safe Heaven Moats</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenAlpha">Safe Heaven Stocks + Alpha</a>
                                         {/*<a className="dropdown-item" href="#">Nifty Algo Trading</a>*/}
                                          <a className="dropdown-item" href="/offerings/superFocused">Super Focused</a>
                                          <a className="dropdown-item" href="/offerings/USAStocks">USA Stocks</a>
                                          <a className="dropdown-item" href="/offerings/unlistedStocks">Unlisted Stocks</a>
                                          <a className="dropdown-item" href="#">Multibagger</a>
                                        </ul>
                                      </li>
                                      <li className="dropdown">
                                        <a href="/about-us" >About Us </a>
                                      </li>
                                      {token ?
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.userinfo && this.state.userinfo.fullName ? <label className="customName"><i className="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</label>:"Login/Signup"}
                                          </a>
                                          <ul className="dropdown-menu customDropdownLogOut hidden-xs hidden-sm " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item col-lg-12" href=""><div className="ImgDiv col-lg-4 col-xs-2 col-sm-2">{firstLetterF}{firstLetterL}</div>&nbsp; &nbsp; {this.state.userinfo && this.state.userinfo.fullName ? <span className="mt20">{this.state.userinfo.fullName}</span>:null}</a>
                                            <hr/>
                                             <a className="dropdown-item  col-lg-7 col-xs-7 col-sm-7" href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a>
                                             <a className="dropdown-item  col-lg-7 col-xs-7 col-sm-7" href="/MyOrders"><span className="myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item col-lg-6 row cursorPointer"  onClick={this.logout.bind(this)}><span className="logOutButton pull-right">Logout</span></a>
                                            
                                          </ul>
                                          <ul className="dropdown-menu  hidden-md hidden-lg" aria-labelledby="navbarDropdownMenuLink">
                                              <a className="dropdown-item backColorPurple" href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a>
                                              <a className="dropdown-item backColorPurple" href="/MyOrders"><span className="myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer" onClick={this.logout.bind(this)}><span className="myprofileButton">Logout</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer"  ><span className=" pull-right"></span></a>
                                           
                                          </ul>
                                        </li>
                                        :
                                      <li className="dropdown">
                                        <a href="/login">Login/Signup </a>
                                      </li>                                      
                                      }
                                      <li className="dropdown">
                                        <a href="/join-as-partner">Join as a Partner </a>
                                      </li>  
                                      
                                                                        
                                    </ul>
                                  }
                                
                                </div>
                              </div>
                            </nav>
                          </div>
                        </div>
                         <div className="col-lg-12 col-md-12 hidden-xs hidden-sm">
                          <div className="row">
                            <nav className="navbar marginZero customNavBar navbar-default">
                                <div className="container-fluid">
                                  <div className="navbar-header">
                                    <a className="navbar-brand webSiteNameOther colorWhite hidden-lg hidden-md col-lg-1 col-md-1 col-sm-1 col-xs-1" href="/">
                                      <img src ="/images/IMG-20191129-WA0007.jpg" alt="" />
                                    </a>

                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navBar" aria-expanded="false" >
                                      <span className="sr-only">Toggle navigation</span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                      <span className="icon-bar"></span>
                                    </button>

                                  </div>

                                  <div className="collapse navbar-collapse" id="navBar">
                                  { token ?
                                    <ul className="nav navbar-nav navbar-right customUl">
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Articulations <span className="caret"></span>
                                        </a>                       
                                        <ul className="dropdown-menu customDropdown">
                                            <a href="/AllBlogs">Arthavrudhhi Blogs</a>
                                            <a href="">Communique</a>
                                            <a href="/free-research-reports">Free Research Reports</a>
                                        </ul>
                                      </li>
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Offerings <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu customDropdown " aria-labelledby="navbarDropdownMenuLink">
                                          <a  className="dropdown-item" href="/offerings/5gcpm">5GCPM</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenMoats">Safe Heaven Moats</a>
                                          <a className="dropdown-item" href="/offerings/superFocused">Super Focused</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenAlpha">Safe Heaven Stocks + Alpha</a>
                                         <a className="dropdown-item" href="#">Nifty Algo Trading</a>
                                          <a className="dropdown-item" href="/offerings/USAStocks">USA Stocks</a>
                                          <a className="dropdown-item" href="/offerings/unlistedStocks">Unlisted Stocks</a>
                                          <a className="dropdown-item" href="#">Multibagger</a>
                                        </ul>
                                      </li>
                                      <li className="dropdown">
                                        <a href="/about-us" >About Us </a>
                                      </li>
                                      {token ?
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.userinfo && this.state.userinfo.fullName ? <label className="customName"><i className="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</label>:"Login/Signup"}
                                          </a>
                                          <ul className="dropdown-menu customDropdownLogOut hidden-xs hidden-sm " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item col-lg-12" href=""><div className="ImgDiv col-lg-4  col-lg-offset-4 col-xs-2 col-sm-2">{firstLetterF}{firstLetterL}</div>
                                            {this.state.userinfo && this.state.userinfo.fullName ? 
                                              <div>
                                              <span className="mt20 textAlignCenter fs19 col-lg-12"><b>{this.state.userinfo.fullName}</b>
                                              </span>
                                               <span className="textAlignCenter mailClass col-lg-12">{this.state.userinfo.email}
                                              </span>
                                              </div>
                                              :null
                                            }</a>
                                            <hr/>
                                             <a className="dropdown-item  col-lg-12 col-xs-12 col-sm-12 mt20 noPadding" href="/clientDashboard"><span className=" col-lg-12 myprofileButton marginTop">My Dashboard</span></a>
                                             <a className="dropdown-item  col-lg-12 col-xs-12 col-sm-12 noPadding" href="/MyOrders"><span className=" col-lg-12 myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item col-lg-6 mt20 cursorPointer"  onClick={this.logout.bind(this)}><span className="logOutButton  col-lg-offset-11">Logout</span></a>
                                            
                                          </ul>
                                          <ul className="dropdown-menu  hidden-md hidden-lg" aria-labelledby="navbarDropdownMenuLink">
                                              <a className="dropdown-item backColorPurple" href="/clientDashboard"><span className="myprofileButton ">My Dashboard</span></a>
                                              <a className="dropdown-item backColorPurple" href="/MyOrders"><span className="myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer" onClick={this.logout.bind(this)}><span className="myprofileButton">Logout</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer"  ><span className=" pull-right"></span></a>
                                           
                                          </ul>
                                        </li>
                                        :
                                      <li className="dropdown">
                                        <a href="/login">Login/Signup </a>
                                      </li>
                                      }
                                      
                                    </ul>
                                    :
                                    <ul className="nav navbar-nav navbar-right customUl width50">
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Articulations <span className="caret"></span>
                                        </a>                       
                                        <ul className="dropdown-menu customDropdown">
                                            <a href="/AllBlogs">Arthavrudhhi Blogs</a>
                                            <a href="">Communique</a>
                                            <a href="/free-research-reports">Free Research Reports</a>
                                        </ul>
                                      </li>
                                      <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Offerings <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu customDropdown " aria-labelledby="navbarDropdownMenuLink">
                                          <a  className="dropdown-item" href="/offerings/5gcpm">5GCPM</a>
                                          <a className="dropdown-item" href="/offerings/safeHeavenMoats">Safe Heaven Moats</a>
                                          {/*<a className="dropdown-item" href="/offerings/superFocused">Super Focused</a>*/}
                                          <a className="dropdown-item" href="/offerings/safeHeavenAlpha">Safe Heaven Stocks + Alpha</a>
                                          <a className="dropdown-item" href="/offerings/superFocused">Super Focused</a>
                                          <a className="dropdown-item" href="/offerings/USAStocks">USA Stocks</a>
                                          <a className="dropdown-item" href="/offerings/unlistedStocks">Unlisted Stocks</a>
                                          <a className="dropdown-item" href="#">Multibagger</a>
                                        </ul>
                                      </li>
                                      <li className="dropdown">
                                        <a href="/about-us" >About Us </a>
                                      </li>
                                      {token ?
                                          <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.userinfo && this.state.userinfo.fullName ? <label className="customName"><i className="fa fa-user-circle-o"></i>&nbsp;{this.state.userinfo.fullName}</label>:"Login/Signup"}
                                          </a>
                                          <ul className="dropdown-menu customDropdownLogOut hidden-xs hidden-sm " aria-labelledby="navbarDropdownMenuLink">
                                            <a  className="dropdown-item col-lg-12" href=""><div className="ImgDiv col-lg-4 col-lg-offset-4 col-xs-2 col-sm-2">{firstLetterF}{firstLetterL}</div>&nbsp; &nbsp; {this.state.userinfo && this.state.userinfo.fullName ? <span className="mt20">{this.state.userinfo.fullName}</span>:null}</a>
                                            <hr/>
                                             <a className="dropdown-item  col-lg-7 col-xs-7 col-sm-7" href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a>
                                             <a className="dropdown-item  col-lg-7 col-xs-7 col-sm-7" href="/MyOrders"><span className="myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item col-lg-6 row cursorPointer"  onClick={this.logout.bind(this)}><span className="logOutButton pull-right">Logout</span></a>
                                            
                                          </ul>
                                          <ul className="dropdown-menu  hidden-md hidden-lg" aria-labelledby="navbarDropdownMenuLink">
                                              <a className="dropdown-item backColorPurple" href="/clientDashboard"><span className="myprofileButton">My Dashboard</span></a>
                                              <a className="dropdown-item backColorPurple" href="/MyOrders"><span className="myprofileButton">My Orders</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer" onClick={this.logout.bind(this)}><span className="myprofileButton">Logout</span></a>
                                             <a className="dropdown-item backColorPurple cursorPointer"  ><span className=" pull-right"></span></a>
                                           
                                          </ul>
                                        </li>
                                        :
                                      <li className="dropdown">
                                        <a href="/login">Login/Signup </a>
                                      </li>                                     
                                      }
                                       <li className="dropdown">
                                        <a href="/join-as-partner" >Join as a Partner </a>
                                      </li>
                                      

                                    </ul>
                                  }
                                
                              </div>
                            </div>
                          </nav>
                          </div>
                        </div>
          </div>
          <div className="row">
          <div className="modal fade in " id="EnquireModal" role="dialog">
                                <div className="modal-dialog customModalEN" >
                                 <div className="modal-header textAlignCenter modalHeaderCustom">
                                    <button type="button" className="close" data-dismiss="modal" > <i className="fa fa-times"></i></button>
                                    <h4 className="modal-title">Enquire Now</h4>
                                  </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pad40">
                                    <form>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Name <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="text" className="customInputKF inputBox nameParts" id="nameModal" name="nameModal" placeholder="Enter here" ref="nameModal" value={this.state.nameModal} onChange={this.handleChange1.bind(this)}/>
                                             <div className="errorMsg">{this.state.errors1.nameModal}</div>

                                            </div>

                                        </div>

                                      </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row"> 
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Mobile Number <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <input type="number" className="customInputKF inputBox nameParts" name="contactNumberModal" placeholder="Enter here" ref="contactNumberModal" value={this.state.contactNumberModal} onChange={this.handleChange1.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.contactNumberModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <label>Email ID <span className="asterix">*</span></label>
                                            </div>
                                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                 <input type="email" className="customInputKF inputBox nameParts" name="emailModal" placeholder="Enter here" ref="emailModal" value={this.state.emailModal}  onChange={this.handleChange1.bind(this)}/>
                                            <div className="errorMsg">{this.state.errors1.emailModal}</div>

                                            </div>
                                        </div>
                                      </div>
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 inputContainerRP textAlignCenter">
                                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 submitButton pull-right" onClick={this.SubmitEnquire.bind(this)}>
                                              {this.state.modalsubmitbtn }
                                            </div>
                                             
                                      </div>
                                    </form>
                                  </div>
                        
                                </div>
                             </div>
                     
                     {
                       !token ? <div className="enquireNow enquirenowsidebtn"  data-toggle="modal" data-target="#EnquireModal">Enquire Now</div>
                       :
                       null 
                     }
     </div>      
    </div>  
      <div className="hidden-lg hidden-md col-sm-12 col-xs-12 sebicontain">
        <a className="navbar-brand colorP" href="" style={{paddingLeft :'0px',paddingRight :'0px', fontSize: '16.5px',height: '48px'}}><b>SEBI Registration No. INH000005397</b></a>
      </div>
    </div>    
    );
  }
}
