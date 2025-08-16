var mailer = require('./mailer');
var config = require('../config/config');

async function sendForgotPasswordLink(email, id) {
  const mailoptions = {
    from: config.EMAIL,
    to: email,
    subject: 'Forgot Password',
    html: '<h1>Change your password</h1><a href ="' + config.API_URL + '/forgotpassword?id=' + id + '">Please click here to change your password</a></b>'
  };
  return await mailer.sendMail(mailoptions);
}

async function sendMailFromChatBot(data) {
  const studentInfoTemplate = studentDetailsTemplate(data.name, data.mobilenumber, data.location, data.website);
  const mailoptions = {
    from: config.EMAIL,
    to: "simone.tagliapietra.job@gmail.com",
    subject: 'Student Informations',
    html: studentInfoTemplate
  };
  return await mailer.sendMail(mailoptions);
}


function studentDetailsTemplate(name, location, website) {
  let html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="EN">
        <head>
        <title> </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0 " >
        <link href="https://fonts.googleapis.com/css?family=Overlock:400,700,900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=swap" rel="stylesheet">
        <meta name="format-detection" content="telephone=no" >
        <style type="text/css">
        .ReadMsgBody { width: 100%; background-color: #ffffff; }
        .ExternalClass { width: 100%; background-color: #ffffff; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
        html { width: 100%; }
        table { border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; margin:0 auto; }
        table table table { table-layout: auto; }
        img { display: block !important; over-flow: hidden !important; border: 0 !important;outline: none !important;}
        body {-ms-text-size-adjust: none;  margin: 0 auto !important; padding: 0 !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important;
          -webkit-font-smoothing: antialiased !important;
        }
        #MessageViewBody, #MessageWebViewDiv{
            width: 100% !important;
          min-width:100vw;
          margin:0 !important;
          zoom:1 !important;
        }
        p {
          margin: 0px !important;
          padding: 0px !important;
        }
        td, a, span {
          border-collapse: collapse;
          mso-line-height-rule: exactly;
        }
        .ExternalClass * {
          line-height: 100%;
        }
         @media only screen and (max-width:600px) {
        .em_main_table {
          width: 100% !important;
        }
        .em_wrapper {
          width: 100% !important; max-width: 100% !important;
        }
        .em_hide {
          display: none !important;
        }
        .em_align_center {
          text-align: center !important;
        }
        .em_pad_top {
          padding-top: 20px !important;
        }
        .em_side_space {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .em_bg_center {
          background-position: center !important;
        }
        .em_full_width {
          width: 100% !important;
          height: auto !important;
          max-width: 100% !important;
        }
        .em_pad_btm {
          padding-bottom: 28px !important;
        }
    u + .em_body .em_full_wrap {
      width: 100% !important;
      width: 100vw !important;
    }
    }
    </style>
    </head>
    <body class="em_body"  style="min-width: 100%;  background-color:#fbfbfb;margin:0 auto !important;padding:0;">
        <table class="em_full_wrap" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:#fbfbfb;">
          <tr>
            <td align="center" valign="top" style="padding:10px;"><table align="center" class="em_main_table" width="600" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;" >
                <tr>
                  <td class="em_hide" style="line-height:1px;min-width:600px;" bgcolor="#ffffff">
                  </td>
                </tr>
                <tr>
                <td bgcolor="#ffffff" style="background-color:#ffffff;border-radius:5px;box-shadow:1px 1px 10px 1px #dddddd;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#ffffff" style="background-color:#ffffff;border-radius:5px 5px 0px 0px;border-top:3px solid #FFA100;display:block;" >
                                <table   width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="30" class="em_hide">&nbsp;</td>
                                        <td class="em_side_space"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td height="10" style="line-height:10px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <table width="66" border="0" cellspacing="0" cellpadding="0" align="left">
                                                <tr>
                                                    <td><a target="_blank" style="color:#000000;text-decoration:none;" href="#"></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="15" style="line-height:10px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                            <td width="30" class="em_hide">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
               <tr>
                  <td><table bgcolor="#08405C" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    <td width="40" class="em_hide">&nbsp;</td>
                    <td valign="top" class="em_side_space"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                       <tr>
                        <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td><table width="50" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tr>
                              <td><a target="_blank" style="color:#80BB01;text-decoration:none;" href="#"></a>
                              </td>
                            </tr>
                            </table></td>
                          </tr>
                         <tr>
                        <td height="20" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td class="em_dark_grey_txt" style="font-family:'Nunito', Arial, sans-serif;font-size:27px;text-align:center;text-transform:none;color:#ffffff;letter-spacing:0px;font-weight:300;">                        
                        STUDENT DETAILS 
                        </td>
                        </tr>
                        <tr>
                        <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                      </table></td>
                    <td width="40" class="em_hide">&nbsp;</td>
                    </tr>
                  </table></td>
                </tr>
               <tr>
                  <td  ><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    <td width="40" class="em_hide">&nbsp;</td>
                    <td valign="top" class="em_side_space"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                       <tr>
                        <td height="40" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td class="em_grey_txt" style="font-family:'Nunito', Arial, sans-serif;font-size:16px;text-align:left;padding-left:0px;padding-right:0px;color:#495057;line-height:24px;font-weight:300;">
                        Hello Admin,<br/><br/>
                        Student informations. <br/><br>
                        Name: ${name}<br>
                        Location: ${location}<br>
                        Reference: ${website}
                        <br>
                        </td>
                        </tr>
                        <tr>
                        <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                        <td height="50" style="line-height:1px;font-size:1px;">&nbsp;</td>
                        </tr>
                      </table></td>
                    <td width="40" class="em_hide">&nbsp;</td>
                    </tr>
                  </table></td>
                </tr>
  
                <tr>
                                        <td  bgcolor="#1B2024" style="background-color:#1B2024;border-radius:0px 0px 5px 5px; ">
                                          <table   width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                              <td width="30" class="em_hide">&nbsp;</td>
                                              <td valign="top" class="em_side_space">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                    <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table align="center" border="0" cellspacing="0" cellpadding="0"> 
                                                        <tr>
                                                          <td style="    text-align: center;">
                                                            <span style="font-family:'Nunito', Arial, sans-serif;font-size: 13px;   color:#ffffff;">Available on your mobile phone : &nbsp;
                                                            </span>
                                                          </td>
                                                          <td width="110" style="    text-align: center;">
                                                            <span>
                                                              <a href="#" class="social_icon_oim">
                                                                <img height="25" width="25" style="display:inline !important;height: 25px;width: 25px; max-width:25px;   margin-right: 2px;" src="https://oneonus-front.herokuapp.com/assets/images/apple.png" alt="image">
                                                              </a>
                                                            </span> &nbsp;
                                                            <span>
                                                              <a href="#" class="social_icon_oim">
                                                                <img height="25" width="25" style="display:inline !important;height: 25px;width: 25px;  max-width:25px;  margin-right: 2px;" src="https://oneonus-front.herokuapp.com/assets/images/android.png" alt="image">
                                                              </a>
                                                            </span>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td height="20" style="line-height:1px;font-size:1px;">&nbsp;</td>
                                                  </tr>
                                                <tr>
                                                  <td   class="em_grey_txt" style="font-family:'Nunito', Arial, sans-serif;font-size:12px;text-align:center;color:#6b6b6b;line-height:20px;">
                                                    &copy; 2020 Tvtor - All rights reserved <br class="em_hide"/> Tvtor - registered in USA under KvK number: 1234567 - BTW number: NL123456789B01
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td height="30" style="line-height:1px;font-size:1px;">&nbsp;</td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td width="30" class="em_hide">&nbsp;</td>
                                          </tr>
                                        </table>
                        </td>
                      </tr>
  
            </body>
    </html>
    `;
  return html;
}

module.exports = {
  sendForgotPasswordLink,
  sendMailFromChatBot
}