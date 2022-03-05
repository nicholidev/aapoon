/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
const admin = require("firebase-admin");
const config = require("./../config");
const functions = require("firebase-functions");
const AWS = require("aws-sdk");

const { sendEmail } = require("./../services/Mail");

AWS.config.setPromisesDependency();
AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecret,
  region: config.awsRegion,
});

const sendAcceptMail = (email, name, id, origin, owner) => {
  return sendEmail(
    email,
    "License assigned for aapoon meet",
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New message</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {	padding:0;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:10px 20px 10px 20px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }</style></head>
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F6F6F6"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"><tr><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:800px"><tr><td align="left" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:800px"><table cellpadding="0" cellspacing="0" width="100%" bgcolor="#FDF0E7" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fdf0e7" role="presentation"><tr><td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://opbagx.stripocdn.email/content/guids/CABINET_5e285efe7ec03c1b534b404e2a55cadc/images/aapoon_meet_email_templete01_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="324"></td>
</tr></table></td></tr></table></td>
</tr><tr><td align="left" style="padding:40px;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:720px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:1px solid #555555;border-right:1px solid #555555;border-top:1px solid #555555;border-bottom:1px solid #555555;border-radius:3px" role="presentation"><tr><td align="left" style="padding:40px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:17px;color:#333333;font-size:14px"><span style="font-size:32px"><strong><span style="color:#E2582E">Hello&nbsp;</span><span style="color:#283890">${name}!</span></strong></span><br><br><br><span style="font-size:18px">You have been assigned a license by ${owner} on aapoon meet



<br><br>Please click here to accept the license</span><br><br><br><br></p>
<center><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#283890;border-width:0px 0px 2px 0px;display:inline-block;border-radius:8px;width:auto"><a href="${origin}/accept-licence?licenceId=${id}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#283890;border-width:10px 20px 10px 20px;display:inline-block;background:#283890;border-radius:8px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">Accept</a> </span></center><br><br><span style="font-size:18px">If you do not want to join, no further action is required.<br><br>Regards,<br>aapoon Support</span><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p>
</td></tr></table></td></tr></table></td></tr><tr><td align="left" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:800px"><table cellpadding="0" cellspacing="0" width="100%" bgcolor="#E9E7F4" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#e9e7f4" role="presentation"><tr><td align="center" style="padding:20px;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">© 2022, aapoon Meet. All Right’s Reserved</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table></div></body></html>`
  );
};

const sendRemoveMail = (email, name, owner) => {
  return sendEmail(
    email,
    "License removed for aapoon meet",
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>New message</title>
        <!--[if (mso 16)
          ]><style type="text/css">
            a {
              text-decoration: none;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9
          ]><style>
            sup {
              font-size: 100% !important;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9
          ]><xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml><!
        [endif]-->
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 20px 10px 20px !important;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150% !important;
            }
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
              line-height: 120%;
            }
            h1 {
              font-size: 30px !important;
              text-align: left;
            }
            h2 {
              font-size: 24px !important;
              text-align: left;
            }
            h3 {
              font-size: 20px !important;
              text-align: left;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 30px !important;
              text-align: left;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 24px !important;
              text-align: left;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
              text-align: left;
            }
            .es-menu td a {
              font-size: 14px !important;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 14px !important;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 14px !important;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 14px !important;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px !important;
            }
            *[class="gmail-fix"] {
              display: none !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-button-border {
              display: inline-block !important;
            }
            a.es-button,
            button.es-button {
              font-size: 18px !important;
              display: inline-block !important;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .es-adapt-td {
              display: block !important;
              width: 100% !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-m-p0 {
              padding: 0 !important;
            }
            .es-m-p0r {
              padding-right: 0 !important;
            }
            .es-m-p0l {
              padding-left: 0 !important;
            }
            .es-m-p0t {
              padding-top: 0 !important;
            }
            .es-m-p0b {
              padding-bottom: 0 !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            table.es-social {
              display: inline-block !important;
            }
            table.es-social td {
              display: inline-block !important;
            }
            .es-m-p5 {
              padding: 5px !important;
            }
            .es-m-p5t {
              padding-top: 5px !important;
            }
            .es-m-p5b {
              padding-bottom: 5px !important;
            }
            .es-m-p5r {
              padding-right: 5px !important;
            }
            .es-m-p5l {
              padding-left: 5px !important;
            }
            .es-m-p10 {
              padding: 10px !important;
            }
            .es-m-p10t {
              padding-top: 10px !important;
            }
            .es-m-p10b {
              padding-bottom: 10px !important;
            }
            .es-m-p10r {
              padding-right: 10px !important;
            }
            .es-m-p10l {
              padding-left: 10px !important;
            }
            .es-m-p15 {
              padding: 15px !important;
            }
            .es-m-p15t {
              padding-top: 15px !important;
            }
            .es-m-p15b {
              padding-bottom: 15px !important;
            }
            .es-m-p15r {
              padding-right: 15px !important;
            }
            .es-m-p15l {
              padding-left: 15px !important;
            }
            .es-m-p20 {
              padding: 20px !important;
            }
            .es-m-p20t {
              padding-top: 20px !important;
            }
            .es-m-p20r {
              padding-right: 20px !important;
            }
            .es-m-p20l {
              padding-left: 20px !important;
            }
            .es-m-p25 {
              padding: 25px !important;
            }
            .es-m-p25t {
              padding-top: 25px !important;
            }
            .es-m-p25b {
              padding-bottom: 25px !important;
            }
            .es-m-p25r {
              padding-right: 25px !important;
            }
            .es-m-p25l {
              padding-left: 25px !important;
            }
            .es-m-p30 {
              padding: 30px !important;
            }
            .es-m-p30t {
              padding-top: 30px !important;
            }
            .es-m-p30b {
              padding-bottom: 30px !important;
            }
            .es-m-p30r {
              padding-right: 30px !important;
            }
            .es-m-p30l {
              padding-left: 30px !important;
            }
            .es-m-p35 {
              padding: 35px !important;
            }
            .es-m-p35t {
              padding-top: 35px !important;
            }
            .es-m-p35b {
              padding-bottom: 35px !important;
            }
            .es-m-p35r {
              padding-right: 35px !important;
            }
            .es-m-p35l {
              padding-left: 35px !important;
            }
            .es-m-p40 {
              padding: 40px !important;
            }
            .es-m-p40t {
              padding-top: 40px !important;
            }
            .es-m-p40b {
              padding-bottom: 40px !important;
            }
            .es-m-p40r {
              padding-right: 40px !important;
            }
            .es-m-p40l {
              padding-left: 40px !important;
            }
          }
        </style>
      </head>
      <body
        style="
          width: 100%;
          font-family: arial, 'helvetica neue', helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
      >
        <div class="es-wrapper-color" style="background-color: #f6f6f6">
          <!--[if gte mso 9
            ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background
          ><![endif]-->
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
            "
          >
            <tr>
              <td valign="top" style="padding: 0; margin: 0">
                <table
                  class="es-header"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-header-body"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 800px;
                        "
                      >
                        <tr>
                          <td align="left" style="padding: 0; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 800px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    bgcolor="#FDF0E7"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      background-color: #fdf0e7;
                                    "
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          class="adapt-img"
                                          src="https://opbagx.stripocdn.email/content/guids/CABINET_5e285efe7ec03c1b534b404e2a55cadc/images/aapoon_meet_email_templete01_1.png"
                                          alt
                                          style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                          "
                                          width="324"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 40px; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 720px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: separate;
                                      border-spacing: 0px;
                                      border-left: 1px solid #555555;
                                      border-right: 1px solid #555555;
                                      border-top: 1px solid #555555;
                                      border-bottom: 1px solid #555555;
                                      border-radius: 3px;
                                    "
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="padding: 40px; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 17px;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          <span style="font-size: 32px"
                                            ><strong
                                              ><span style="color: #e2582e"
                                                >Hello&nbsp;</span
                                              ><span style="color: #283890"
                                                >${name}!</span
                                              ></strong
                                            ></span
                                          ><br /><br /><br /><span
                                            style="font-size: 18px"
                                            >Your license have been removed by
                                            ${owner}.
    
                                            <br /><br />
                                            <br /><br />Regards,<br />aapoon
                                            Support</span
                                          >
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 0; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 800px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    bgcolor="#E9E7F4"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                      background-color: #e9e7f4;
                                    "
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 20px; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 21px;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          © 2022, aapoon Meet. All Right’s Reserved
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `
  );
};

exports.onLicensesCreate = functions.firestore
  .document("licenses/{licenceid}")
  .onCreate(async (snap, context) => {
    const licenseData = snap.data();
    try {
      const userLicenses = (
        await admin
          .firestore()
          .collection("users")
          .doc(licenseData.owner)
          .collection("licences")
          .doc("premium")
          .get()
      ).data();

      let assigned = userLicenses.assigned ? userLicenses.assigned : 0;
      if (userLicenses.count > 0 && assigned < userLicenses.count - 1) {
        await snap.ref.set(
          {
            ...licenseData,
            origin: licenseData.origin,
            isActivated: true,
            isExpired: false,
            isAccepted: false,
          },
          { merge: true }
        );
        await sendAcceptMail(
          licenseData.email,
          licenseData.firstName,
          context.params.licenceid,
          licenseData.origin,
          licenseData.ownerName
        );
      } else {
        await snap.ref.set(
          {
            ...licenseData,
            origin: licenseData.origin,
            isActivated: false,
            isExpired: false,
            isAccepted: false,
          },
          { merge: true }
        );
        throw new Error(`User does not have enough licenses`);
      }

      return;
    } catch (error) {
      console.log(error);
      await snap.ref.set(
        {
          ...licenseData,
          origin: licenseData.origin,
          isActivated: false,
          isExpired: false,
          isAccepted: false,
        },
        { merge: true }
      );
    }
  });

exports.onLicensesUpdate = functions.firestore
  .document("licenses/{licenceid}")
  .onUpdate(async (change) => {
    const licenseData = change.after.data();
    const oldData = change.before.data();

    if (licenseData.isActivated == oldData.isActivated) return;

    if (!licenseData.isActivated) {
      sendRemoveMail(
        licenseData.email,
        licenseData.firstName,

        licenseData.ownerName
      );
    }

    try {
      await admin
        .firestore()
        .collection("users")
        .doc(licenseData.owner)
        .collection("licences")
        .doc("premium")
        .update({
          assigned: licenseData.isActivated
            ? admin.firestore.FieldValue.increment(1)
            : admin.firestore.FieldValue.increment(-1),
          isExpired: !licenseData.isActivated ? true : false,
        });

      return;
    } catch (error) {
      console.log(error);
    }
  });

exports.updateUserLicenses = functions.firestore
  .document("users/{userid}/licences/{lid}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();

    if (newValue.count - 1 < newValue.assigned) {
      let licensesToRevoke = newValue.assigned - (newValue.count - 1);

      const batchArray = [];
      batchArray.push(admin.firestore().batch());
      let operationCounter = 0;
      let batchIndex = 0;
      const documentSnapshotArray = await admin
        .firestore()
        .collection("licenses")
        .where("owner", "==", context.params.userid)
        .where("isActivated", "==", true)
        .limit(licensesToRevoke)
        .get();
      documentSnapshotArray.forEach((documentSnapshot) => {
        // update document data here...

        batchArray[batchIndex].update(documentSnapshot.ref, {
          isActivated: false,
        });
        operationCounter++;

        if (operationCounter === 499) {
          batchArray.push(admin.firestore().batch());
          batchIndex++;
          operationCounter = 0;
        }
      });

      batchArray.forEach(async (batch) => await batch.commit());

      return;
    }
  });
