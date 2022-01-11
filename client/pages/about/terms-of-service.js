/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { capitalCase } from 'change-case';
import RouterLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip, Paper } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import DashboardHeader from '../../layouts/dashboard/header/index';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import AuthFirebaseSocials from '../../sections/auth/AuthFirebaseSocial';
import DashboardLayout from '../../layouts/dashboard';
import Divider from '@mui/material/Divider';
// ----------------------------------------------------------------------
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButtonAnimate } from '../../components/animate';
import Iconify from '../../components/Iconify';
import { useRouter } from 'next/router';
const RootStyle = styled('div')(({ theme }) => ({}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 0, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',

  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

function TermsOfService() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();

  return (
    <Page title="Schedule Meeting">
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#F1F1F1' },
        }}
      />
      <RootStyle>
        <DashboardHeader />

        <Container sx={{ mt: { xs: 2 } }}>
          <Paper>
            <ContentStyle>
              <Box sx={{ mb: 5 }}>
                {/* <IconButtonAnimate onClick={() => router.back()}>
                  <Iconify icon={'eva:arrow-back-fill'} />
                </IconButtonAnimate>
                &nbsp;&nbsp;&nbsp;&nbsp; */}
                <Typography variant="h2" align="center" gutterBottom sx={{ fontSize: { xs: '22px', md: '40px' } }}>
                  Terms Of Service
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '18px' } }} gutterBottom>
                  EFFECTIVE: August 09, 2021
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '18px' } }}>
                  IMPORTANT, READ CAREFULLY: YOUR USE OF AND ACCESS TO THE WEBSITE AND PRODUCTS AND SERVICES AND
                  ASSOCIATED SOFTWARE (COLLECTIVELY, THE "SERVICES") OF AAPOON, INC. AND ITS AFFILIATES ("MEETAAP") IS
                  CONDITIONED UPON YOUR COMPLIANCE WITH AND ACCEPTANCE OF THESE TERMS, WHICH INCLUDE YOUR AGREEMENT TO
                  ARBITRATE CLAIMS. PLEASE REVIEW THOROUGHLY BEFORE ACCEPTING.
                </Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '18px' } }} style={{ marginTop: 10 }}>
                  BY CLICKING/CHECKING THE "I AGREE" BUTTON/BOX, ACCESSING THE MEETAAP WEBSITE OR BY UTILIZING THE MEET
                  AAP SERVICES YOU AGREE TO BE BOUND BY THESE TERMS OF SERVICE AND ALL EXHIBITS, ORDER FORMS, AND
                  INCORPORATED POLICIES (THE “AGREEMENT” OR “TOS”). THE MEET AAP SERVICES ARE NOT AVAILABLE TO PERSONS
                  WHO ARE NOT LEGALLY ELIGIBLE TO BE BOUND BY THESE TERMS OF SERVICE.
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  MEETAAP will provide the Services, and you may access and use the Services, in accordance with this
                  Agreement. MEETAAP may provide any of the Services hereunder through any of its Affiliates. If You
                  order Services through an on-line registration page or an order form (each an "Order Form"), the Order
                  Form may contain additional terms and conditions and information regarding the Services you are
                  ordering. Unless otherwise expressly set forth in any such additional terms and conditions applicable
                  to the specific Service which You choose to use, those additional terms are hereby incorporated into
                  this Agreement in relation to Your use of that Service.
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    System Requirements
                  </Typography>
                  . Use of the Services requires one or more compatible devices, Internet access (fees may apply), and
                  certain software (fees may apply), and may require obtaining updates or upgrades from time to time.
                  Because use of the Services involves hardware, software, and Internet access, Your ability to access
                  and use the Services may be affected by the performance of these factors. High speed Internet access
                  is recommended. You acknowledge and agree that such system requirements, which may be changed from
                  time to time, are Your responsibility.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  1.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    DEFINITIONS
                  </Typography>
                  . The following definitions will apply in this Agreement, and any reference to the singular includes a
                  reference to the plural and vice versa. “Affiliate” means, with respect to a Party, any entity that
                  directly or indirectly controls, is controlled by or is under common control with that Party. For
                  purposes of this Agreement, “control” means an economic or voting interest of at least fifty percent
                  (50%) or, in the absence of such economic or voting interest, the power to direct or cause the
                  direction of the management and set the policies of such entity.
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                    “End User” means a Host or Participant (as defined in the Services Description) who uses the
                    Services.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                    "Initial Subscription Term" means the initial subscription term for a Service as specified in an
                    Order Form.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                    "Service Effective Date" means the date an Initial Subscription Term begins as specified in an Order
                    Form.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                    "Renewal Term" means the renewal subscription term for a Service commencing after the Initial
                    Subscription Term or another Renewal Term as specified in an Order Form.
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  2.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    SERVICES
                  </Typography>
                  . MEETAAP will provide the Services as described on the Order Form, and standard updates to the
                  Services that are made generally available by MEETAAP during the term. MEETAAP may, in its sole
                  discretion, discontinue the Services or modify the features of the Services from time to time without
                  prior notice.
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      a.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Beta Services
                      </Typography>
                      . MEETAAP may, from time to time, offer access to services that are classified as Beta version.
                      Access to and use of Beta versions may be subject to additional agreements. MEETAAP makes no
                      representations that a Beta version will ever be made generally available and reserves the right
                      to discontinue or modify a Beta version at any time without notice. Beta versions are provided AS
                      IS, may contain bugs, errors or other defects, and Your use of a Beta version is at Your sole
                      risk.
                    </Typography>
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  3.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    USE OF SERVICES AND YOUR RESPONSIBILITIES
                  </Typography>
                  . You may only use the Services pursuant to the terms of this Agreement. You are solely responsible
                  for Your and Your End Users’ use of the Services and shall abide by, and ensure compliance with, all
                  Laws in connection with Your and each End User’s use of the Services, including but not limited to
                  Laws related to recording, intellectual property, privacy and export control. Use of the Services is
                  void where prohibited.
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      a.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Registration Information
                      </Typography>
                      . You may be required to provide information about Yourself in order to register for and/or use
                      certain Services. You agree that any such information shall be accurate. You may also be asked to
                      choose a user name and password. You are entirely responsible for maintaining the security of Your
                      user name and password and agree not to disclose such to any third party.
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      b.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Your Content
                      </Typography>
                      . You agree that You are solely responsible for the content ("Content") sent or transmitted by You
                      or displayed or uploaded by You in using the Services and for compliance with all Laws pertaining
                      to the Content, including, but not limited to, Laws requiring You to obtain the consent of a third
                      party to use the Content and to provide appropriate notices of third-party rights. You represent
                      and warrant that You have the right to upload the Content to MEETAAP and that such use does not
                      violate or infringe on any rights of any third party. Under no circumstances will MEETAAP be
                      liable in any way for any (a) Content that is transmitted or viewed while using the Services, (b)
                      errors or omissions in the Content, or (c) any loss or damage of any kind incurred as a result of
                      the use of, access to, or denial of access to Content. Although MEETAAP is not responsible for any
                      Content, MEETAAP may delete any Content, at any time without notice to You, if MEETAAP becomes
                      aware that it violates any provision of this Agreement, or any law. You retain copyright and any
                      other rights You already hold in Content which You submit, post or display on or through, the
                      Services.
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      c.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Recordings
                      </Typography>
                      . You are responsible for compliance will all recording laws. The host can choose to record
                      MEETAAP meetings and Webinars. By using the Services, you are giving MEETAAP consent to store
                      recordings for any or all MEETAAP meetings or webinars that you join, if such recordings are
                      stored in our systems. You will receive a notification (visual or otherwise) when recording is
                      enabled. If you do not consent to being recorded, you can choose to leave the meeting or webinar
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      d.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Prohibited Use
                      </Typography>
                      . You agree that You will not use, and will not permit any End User to use, the Services to: (i)
                      modify, disassemble, decompile, prepare derivative works of, reverse engineer or otherwise attempt
                      to gain access to the source code of the Services; (ii) knowingly or negligently use the Services
                      in a way that abuses, interferes with, or disrupts MEETAAP’s networks, Your accounts, or the
                      Services; (iii) engage in activity that is illegal, fraudulent, false, or misleading, (iv)
                      transmit through the Services any material that may infringe the intellectual property or other
                      rights of third parties; (v) build or benchmark a competitive product or service, or copy any
                      features, functions or graphics of the Services; or (vi) use the Services to communicate any
                      message or material that is harassing, libelous, threatening, obscene, indecent, would violate the
                      intellectual property rights of any party or is otherwise unlawful, that would give rise to civil
                      liability, or that constitutes or encourages conduct that could constitute a criminal offense,
                      under any applicable law or regulation; (vii) upload or transmit any software, Content or code
                      that does or is intended to harm, disable, destroy or adversely affect performance of the Services
                      in any way or which does or is intended to harm or extract information or data from other
                      hardware, software or networks of MEETAAP or other users of Services; (viii) engage in any
                      activity or use the Services in any manner that could damage, disable, overburden, impair or
                      otherwise interfere with or disrupt the Services, or any servers or networks connected to the
                      Services or MEETAAP's security systems. (ix) use the Services in violation of any MEETAAP policy
                      or in a manner that violates applicable law, including but not limited to anti-spam, export
                      control, privacy, and antiterrorism laws and regulations and laws requiring the consent of
                      subjects of audio and video recordings, and You agree that You are solely responsible for
                      compliance with all such laws and regulations.
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 5, display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      e.
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                      <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                        Limitations on Use
                      </Typography>
                      . You may not reproduce, resell, or distribute the Services or any reports or data generated by
                      the Services for any purpose unless You have been specifically permitted to do so under a separate
                      agreement with MEETAAP. You may not offer or enable any third parties to use the Services
                      purchased by You, display on any website or otherwise publish the Services or any Content obtained
                      from a Service (other than Content created by You) or otherwise generate income from the Services
                      or use the Services for the development, production or marketing of a service or product
                      substantially similar to the Services.
                    </Typography>
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  4.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    RESPONSIBILITY FOR END USERS
                  </Typography>
                  . You are responsible for the activities of all End Users who access or use the Services through your
                  account and you agree to ensure that any such End User will comply with the terms of this Agreement
                  and any MEETAAP policies. MEETAAP assumes no responsibility or liability for violations. If You become
                  aware of any violation of this Agreement in connection with use of the Services by any person, please
                  contact MEETAAP at support@meetaap.in. MEETAAP may investigate any complaints and violations that come
                  to its attention and may take any (or no) action that it believes is appropriate, including, but not
                  limited to issuing warnings, removing the content or terminating accounts and/or User profiles. Under
                  no circumstances will MEETAAP be liable in any way for any data or other content viewed while using
                  the Services, including, but not limited to, any errors or omissions in any such data or content, or
                  any loss or damage of any kind incurred as a result of the use of, access to, or denial of access to
                  any data or content.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  5.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    MEET AAP OBLIGATIONS FOR CONTENT
                  </Typography>
                  . MEETAAP will maintain reasonable physical and technical safeguards to prevent unauthorized
                  disclosure of or access to Content, in accordance with industry standards. MEETAAP will notify You if
                  it becomes aware of unauthorized access to Content. MEETAAP will not access, view or process Content
                  except (a) as provided for in this Agreement and in MEETAAP’s Privacy Statement; (b) as authorized or
                  instructed by You, (c) as required to perform its obligations under this Agreement; or (d) as required
                  by Law. MEETAAP has no other obligations with respect to Content.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  6.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    ELIGIBILITY
                  </Typography>
                  . You affirm that You are at least 16 years of age and are otherwise fully able and competent to enter
                  into the terms, conditions, obligations, affirmations, representations, and warranties set forth in
                  this Agreement, and to abide by and comply with this Agreement. Your access may be terminated without
                  warning if we believe that You are under the age of 16 or are otherwise ineligible.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  7.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    INTENDED USE; RESTRICTION ON USE BY CHILDREN
                  </Typography>
                  . The Services are intended for business use. You may choose to use the Services for other purposes,
                  subject to the terms and limitations of this Agreement. MEETAAP is not intended for use by individuals
                  under the age of 16, unless it is through a School Subscriber (as that term is defined in the Services
                  Description) using MEETAAP for Education (K-12).
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  8.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    CHARGES AND CANCELLATION
                  </Typography>
                  . You agree that MEETAAP may charge to Your credit card or other payment mechanism selected by You and
                  approved by MEETAAP ("Your Account") all amounts due and owing for the Services, including taxes and
                  service fees, set up fees, subscription fees, or any other fee or charge associated with Your Account.
                  MEETAAP may change prices at any time, including changing from a free service to a paid service and
                  charging for Services that were previously offered free of charge; provided, however, that MEETAAP
                  will provide you with prior notice and an opportunity to terminate Your Account if MEETAAP changes the
                  price of a Service to which you are subscribed and will not charge you for a previously free Service
                  unless you have been notified of the applicable fees and agreed to pay such fees. You agree that in
                  the event MEETAAP is unable to collect the fees owed to MEETAAP for the Services through Your Account,
                  MEETAAP may take any other steps it deems necessary to collect such fees from You and that You will be
                  responsible for all costs and expenses incurred by MEETAAP in connection with such collection
                  activity, including collection fees, court costs and attorneys' fees. You further agree that MEETAAP
                  may collect interest at the lesser of 1.5% per month or the highest amount permitted by law on any
                  amounts not paid when due. You may cancel your subscription at any time. If you cancel, you will not
                  be billed for any additional terms of service, and service will continue until the end of the current
                  Subscription Term. If you cancel, you will not receive a refund for any service already paid for.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  9.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    TERMINATION
                  </Typography>
                  . The MEETAAP website contains information on how to terminate Your Account. If you have purchased a
                  Service for a specific term, such termination will be effective on the last day of the then-current
                  term. Your Order Form may provide that a Renewal Term will begin automatically unless either party
                  provides notice of termination at least thirty (30) days prior to the commencement of the next Renewal
                  Term. If You fail to comply with any provision of this Agreement, MEETAAP may terminate this Agreement
                  immediately and retain any fees previously paid by You. Sections 1 and 3 through 20, inclusive, shall
                  survive any termination of this Agreement. Upon any termination of this Agreement, You must cease any
                  further use of the Services. If at any time You are not happy with the Services, Your sole remedy is
                  to cease using the Services and follow this termination process.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  10.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    PROPRIETARY RIGHTS
                  </Typography>
                  . MEETAAP and/or its suppliers, as applicable, retain ownership of all proprietary rights in the
                  Services and in all trade names, trademarks, service marks, logos, and domain names ("MEETAAP Marks")
                  associated or displayed with the Services. You may not frame or utilize framing techniques to enclose
                  any MEETAAP Marks, or other proprietary information (including images, text, page layout, or form) of
                  MEETAAP without express written consent. You may not use any meta tags or any other "hidden text"
                  utilizing MEETAAP Marks without MEETAAP's express written consent.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  11.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    COPYRIGHT
                  </Typography>
                  . You may not post, modify, distribute, or reproduce in any way copyrighted material, trademarks,
                  rights of publicity or other proprietary rights without obtaining the prior written consent of the
                  owner of such proprietary rights. MEETAAP may deny access to the Services to any User who is alleged
                  to infringe another party's copyright. Without limiting the foregoing, if You believe that Your
                  copyright has been infringed, please notify MEETAAP by sending an email to &nbsp;
                  <a href="mailto:support@meetapp.in">support@meetapp.in</a>
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  12.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    EXPORT RESTRICTIONS
                  </Typography>
                  . You acknowledge that the Services, or a portion thereof, are subject to the Export Administration
                  Regulations, 15 C.F.R. Parts 730-774, of the United States and may be subject to other applicable
                  country export control and trade sanctions laws (“Export Control and Sanctions Laws”). MEETAAP will
                  provide the U.S. export classification(s) applicable to its Services upon request. You and Your End
                  Users may not access, use, export, re-export, divert, transfer or disclose any portion of the Services
                  or any related technical information or materials, directly or indirectly, in violation of Export
                  Control and Sanctions Laws. You represent and warrant that: (i) You and Your End Users (a) are not
                  citizens of, or located within, a country or territory that is subject to U.S. trade sanctions or
                  other significant trade restrictions (including without limitation Cuba, Iran, North Korea, Syria, and
                  the Crimea region of Ukraine) and that You and Your End Users will not access or use the Services, or
                  export, re-export, divert, or transfer the Services, in or to such countries or territories; (b) are
                  not persons, or owned 50% or more, individually or in the aggregate by persons, identified on the U.S.
                  Department of the Treasury’s Specially Designated Nationals and Blocked Persons List or Foreign
                  Sanctions Evaders Lists; and (c) are not persons on the U.S. Department of Commerce’s Denied Persons
                  List, Entity List, or Unverified List, or U.S. Department of State proliferation-related lists; (ii)
                  You and Your End Users located in China, Russia, or Venezuela are not Military End Users and will not
                  put MEETAAP’s Services to a Military End Use, as defined in 15 C.F.R. 744.21; (iii) no Content created
                  or submitted by You or Your End Users is subject to any restriction on disclosure, transfer, download,
                  export or re-export under the Export Control and Sanctions Laws; and (iv) You and Your End Users will
                  not take any action that would constitute a violation of, or be penalized under, U.S. antiboycott laws
                  administered by the U.S. Department of Commerce or the U.S. Department of the Treasury. You are solely
                  responsible for complying with the Export Control and Sanctions Laws and monitoring them for any
                  modifications.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  13.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    NO HIGH RISK USE
                  </Typography>
                  . The Services are not designed or licensed for use in hazardous environments requiring fail-safe
                  controls, including without limitation operation of nuclear facilities, aircraft
                  navigation/communication systems, air traffic control, and life support or weapons systems. The
                  Services shall not be used for or in any HIGH RISK environment.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  14.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    INJUNCTIVE RELIEF
                  </Typography>
                  . You acknowledge that any use of the Services contrary to this Agreement, or any transfer,
                  sublicensing, copying or disclosure of technical information or materials related to the Services, may
                  cause irreparable injury to MEETAAP, its Affiliates, suppliers and any other party authorized by
                  MEETAAP to resell, distribute, or promote the Services ("Resellers"), and under such circumstances
                  MEETAAP, its Affiliates, suppliers and Resellers will be entitled to equitable relief, without posting
                  bond or other security, including, but not limited to, preliminary and permanent injunctive relief.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  15.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    NO WARRANTIES
                  </Typography>
                  . YOU UNDERSTAND AND AGREE THAT THE SERVICES ARE PROVIDED "AS IS" AND MEET AAP, ITS AFFILIATES,
                  SUPPLIERS AND RESELLERS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                  WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
                  NON-INFRINGEMENT. MEET AAP, ITS AFFILIATES, SUPPLIERS AND RESELLERS MAKE NO WARRANTY OR REPRESENTATION
                  REGARDING THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES, REGARDING THE ACCURACY OR
                  RELIABILITY OF ANY INFORMATION OBTAINED THROUGH THE SERVICES OR THAT THE SERVICES WILL MEET ANY USER'S
                  REQUIREMENTS, OR BE UNINTERRUPTED, TIMELY, SECURE OR ERROR FREE. USE OF THE SERVICES IS AT YOUR SOLE
                  RISK. ANY MATERIAL AND/OR DATA DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS AT
                  YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOU RESULTING FROM THE
                  USE OF THE SERVICES. THE ENTIRE RISK ARISING OUT OF USE OR PERFORMANCE OF THE SERVICES REMAINS WITH
                  YOU. MEET AAP DOES NOT ASSUME ANY RESPONSIBILITY FOR RETENTION OF ANY USER INFORMATION OR
                  COMMUNICATIONS BETWEEN USERS. MEET AAP CANNOT GUARANTEE AND DOES NOT PROMISE ANY SPECIFIC RESULTS FROM
                  USE OF THE SERVICES. USE IS AT YOUR OWN RISK.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  16.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    INDEMNIFICATION
                  </Typography>
                  . You agree to indemnify, defend and hold harmless MEETAAP, its affiliates, officers, directors,
                  employees, consultants, agents, suppliers and Resellers from any and all third party claims,
                  liability, damages and/or costs (including, but not limited to, attorneys' fees) arising from Your use
                  of the Services, Your violation of this Agreement or the infringement or violation by You or any other
                  user of Your account, of any intellectual property or other right of any person or entity or
                  applicable law.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  17.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    LIMITATION OF LIABILITY
                  </Typography>
                  . TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL MEET AAP OR ITS AFFILIATES,
                  SUPPLIERS OR RESELLERS BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY OR CONSEQUENTIAL
                  DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS
                  INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS OR DAMAGE) ARISING OUT OF THE
                  USE OF OR INABILITY TO USE THE SERVICES OR THE PROVISION OF OR FAILURE TO PROVIDE TECHNICAL OR OTHER
                  SUPPORT SERVICES, WHETHER ARISING IN TORT (INCLUDING NEGLIGENCE) CONTRACT OR ANY OTHER LEGAL THEORY,
                  EVEN IF MEET AAP, ITS AFFILIATES, SUPPLIERS OR RESELLERS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                  DAMAGES. IN ANY CASE, MEET AAP'S, ITS AFFILIATES', SUPPLIERS' AND RESELLERS' MAXIMUM CUMULATIVE
                  LIABILITY AND YOUR EXCLUSIVE REMEDY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THIS AGREEMENT WILL BE
                  LIMITED TO THE AMOUNT ACTUALLY PAID BY YOU FOR THE SERVICES (IF ANY) IN THE TWELVE (12) MONTHS
                  PRECEDING THE EVENT OR CIRCUMSTANCES GIVING RISE TO SUCH CLAIMS. Because some states and jurisdictions
                  do not allow the exclusion or limitation of liability, the above limitation may not apply to You.
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  18.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    AGREEMENT TO ARBITRATE; WAIVER OF CLASS ACTION
                  </Typography>
                  . If You are located in the United States, You agree to resolve disputes only on an individual basis,
                  through arbitration pursuant to the provisions of Exhibit A.{' '}
                  <Typography style={{ fontWeight: 700 }}>
                    The parties expressly waive any right to bring any action, lawsuit, or proceeding as a class or
                    collective action, private attorney general action, or any other proceeding in which any party acts
                    or proposes to act in a representative capacity.
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  19.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    PRIVACY AND OTHER POLICIES
                  </Typography>
                  . Use of the Services is also subject to MEETAAP's Privacy Statement, a link to which can be found by
                  selecting “Privacy Policy ” in the footer of MEETAAP.IN website. The Privacy Statement and all
                  policies noticed at <a href="https://www.meetaap.in/privacy-policy">www.meetaap.in/privacy-policy</a>{' '}
                  are incorporated into this Agreement by this reference. Additionally, You understand and agree that
                  MEETAAP may contact You via e-mail or otherwise with information relevant to Your use of the Services,
                  regardless of whether You have opted out of receiving marketing communications or notices.
                </Typography>
              </Box>
              <Box sx={{ mb: 3, pl: 5, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  20.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    MISCELLANEOUS
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  20.1
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Choice of Law and Forum
                  </Typography>
                  . This Agreement shall be governed by and construed under the laws of the State of TEXAS. U.S.A
                  exclusive jurisdiction and venue of the state courts located in and serving Harris County, Texas and
                  the federal courts in the Southern District of TEXAS.
                </Typography>
              </Box>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  20.2
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Contracting Entity
                  </Typography>
                  . In the event Your MEETAAP account reflects a bill to/sold to address in India, the contracting
                  entity under these TOS shall be MEETAAP’s Affiliate, AAPOON DIGITAL Pvt. Ltd.
                </Typography>
              </Box>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  20.3
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Waiver and Severability
                  </Typography>
                  . Failure by either Party to exercise any of its rights under, or to enforce any provision of, this
                  Agreement will not be deemed a waiver or forfeiture of such rights or ability to enforce such
                  provision. If any provision of this Agreement is held by a court of competent jurisdiction to be
                  illegal, invalid or unenforceable, that provision will be amended to achieve as nearly as possible the
                  same economic effect of the original provision and the remainder of this Agreement will remain in full
                  force and effect.
                </Typography>
              </Box>
              <Box sx={{ mb: 4, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  20.4
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    General Provisions
                  </Typography>
                  . This Agreement embodies the entire understanding and agreement between the Parties respecting the
                  subject matter of this Agreement and supersedes any and all prior understandings and agreements
                  between the Parties respecting such subject matter, except that if You or Your company have executed a
                  separate written agreement or you have signed an order form referencing a separate agreement governing
                  your use of the Services, then such agreement shall control to the extent that any provision of this
                  Agreement conflicts with the terms of such agreement. MEETAAP may elect to change or supplement the
                  terms of this Agreement from time to time at its sole discretion. MEETAAP will exercise commercially
                  reasonable business efforts to provide notice to You of any material changes to this Agreement. Within
                  ten (10) business days of posting changes to this Agreement (or ten (10) business days from the date
                  of notice, if such is provided), they will be binding on You. If You do not agree with the changes,
                  You should discontinue using the Services. If You continue using the Services after such
                  ten-business-day period, You will be deemed to have accepted the changes to the terms of this
                  Agreement. In order to participate in certain Services, You may be notified that You are required to
                  download software and/or agree to additional terms and conditions. Unless expressly set forth in such
                  additional terms and conditions, those additional terms are hereby incorporated into this Agreement.
                  This Agreement has been prepared in the English Language and such version shall be controlling in all
                  respects and any non-English version of this Agreement is solely for accommodation purposes.
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '18px' } }}>
                  Exhibit A
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '14px', md: '18px' } }}>
                  Binding Arbitration
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  This Exhibit A to the TOS describes the further provisions which apply to the Binding Arbitration and
                  Class Action Waiver.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  A.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Disputes
                  </Typography>
                  . A dispute is any controversy between You and MEETAAP concerning the Services, any software related
                  to the Services, the price of the Services, Your account, MEETAAP’s advertising, marketing, or
                  communications, Your purchase transaction or billing, or any term of this Agreement, under any legal
                  theory including contract, warranty, tort, statute, or regulation, except disputes relating to the
                  enforcement or validity of Your or MEETAAP’s intellectual property rights. As part of the best efforts
                  process to resolve disputes, and prior to initiating arbitration proceedings, each party agrees to
                  provide notice of the dispute to the other party, including a description of the dispute, what efforts
                  have been made to resolve it, and what the disputing party is requesting as resolution, to
                  support@meetapp.in.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  B.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Small Claims Court Available
                  </Typography>
                  . You may initiate an action in your local Small Claims Court if You meets the court’s requirements.
                  However, if such a claim is transferred, removed or appealed to a different court, MEETAAP reserves
                  the right to require arbitration.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  C.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Arbitration Procedure
                  </Typography>
                  . Disputes not resolved pursuant to Section A or B shall be resolved through arbitration. The American
                  Arbitration Association (“AAA”) will conduct any arbitration under its Commercial Arbitration Rules.
                  For more information, see <a href="https://www.adr.org">www.adr.org</a>. Arbitration hearings will
                  take place in the federal judicial district of Your primary business location. A single arbitrator
                  will be appointed. The arbitrator must: (a) follow all applicable substantive Law; (b) follow
                  applicable statutes of limitations; (c) honor valid claims of privilege; (d) issue a written decision
                  including the reasons for the award. The arbitrator may award damages, declaratory or injunctive
                  relief, and costs (including reasonable attorneys’ fees). Any arbitration award may be enforced (such
                  as through a judgment) in any court with jurisdiction.&nbsp;
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }}>
                    Under AAA Rules, the arbitrator rules on his or her own jurisdiction, including the arbitrability of
                    any claim; however, a court has exclusive authority to enforce the prohibition on arbitration on a
                    class-wide basis or in a representative capacity
                  </Typography>
                  .
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  D.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Arbitration Fees
                  </Typography>
                  . If You are unable to afford the arbitration costs, MEETAAP will advance those costs to You, subject
                  to the arbitrator’s determination if costs should be reimbursed to MEETAAP if MEETAAP prevails. For
                  disputes involving more than $75,000, the AAA rules will govern payment of filing fees and the AAA’s
                  and arbitrator’s fees and expenses.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  E.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Conflict with AAA Rules
                  </Typography>
                  . This Agreement governs if there is a conflict with the AAA’s Commercial Arbitration Rules.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  F.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Requirement to File Within One Year
                  </Typography>
                  . Notwithstanding any other statute of limitations, a claim or dispute under this Agreement must be
                  filed in Small Claims Court or noticed for arbitration within one year of when it could first be
                  filed, or such claim will be permanently barred.
                </Typography>
              </Box>
              <Box sx={{ pl: 10, display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  G.
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '12px', md: '16px' } }}>
                  <Typography sx={{ fontSize: { xs: '12px', md: '18px' }, fontWeight: 700 }} component={'span'}>
                    Severability
                  </Typography>
                  . If the class action waiver is found to be illegal or unenforceable as to all or some parts of a
                  dispute, then those parts will not be arbitrated but will be resolved in court, with the balance
                  resolved through arbitration. If any provision of this Exhibit A is found to be illegal or
                  unenforceable, then that provision will be severed; however, the remaining provisions shall still
                  apply and shall be interpreted to as nearly as possible achieve the original intent of this Exhibit,
                  inclusive of the severed provision.
                </Typography>
              </Box>
            </ContentStyle>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  );
}

TermsOfService.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TermsOfService;
