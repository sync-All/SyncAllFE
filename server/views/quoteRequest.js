const mjml2html = require('mjml')
const fs = require('fs')

const htmlOutput = mjml2html(`
    <mjml>
      <mj-head>
        <mj-style inline="inline">
        .max-width-class {
            max-width: 600px;
        }
        .no_margin {
            margin: 0px 0px;
        }
        </mj-style>
      </mj-head>
      <mj-body background-color="#F2F5F8" padding-top="2px" padding-bottom="12px" css-class="max-width-class">
        <mj-section padding-left="63px"  width="100px">
          <mj-column padding="0px" margin="0px">
            <mj-image src="cid:headerLogo" align="left" width="107px" padding="0px" margin="0px" alt="logo"  />
          </mj-column>
        </mj-section>
        <mj-section background-color="#F2F5F8" padding-right="32px" padding-left="32px">
            <mj-section background-color="white" padding="24px">
                <mj-column>
                    <mj-text padding="0" margin="0" font-size="16px" color="#333" font-weight="400">
                        Dear User
                    </mj-text>
                    <mj-text padding="0" margin="0" padding-top="20px">
                        You have just received a request for a quote to license your track, [Track Name].
                    </mj-text>
                    <mj-text padding="0" margin="0" padding-top="20px">
                        Best Regards,
                    </mj-text>
                </mj-column>
            </mj-section>
            <mj-section background-color="white" padding="24px" padding-bottom="0px">
                <mj-column width="65%">
                    <mj-text padding="0" margin="0" font-size="14px" color="#0071CE" font-weight="700"  line-height="18px">
                        Victor Asuquo
                    </mj-text>
                    <mj-text padding="0" margin="0" font-size="12px" color="#878787" font-weight="400"  line-height="18px" padding-bottom="25px" >
                        Product Designer
                    </mj-text>
                </mj-column>
                <mj-column width="35%">
                    <mj-text padding="0" margin="0" display="flex" padding-bottom="5px" >
                        <mj-image src="cid:message"/>
                        victor@syncall.com
                    </mj-text>
                    <mj-text padding="0" margin="0" padding-bottom="5px" display="flex">
                        <mj-image src="cid:link"/>
                        www.syncallmusic.com
                    </mj-text>
                    <mj-text padding="0" margin="0" padding-bottom="25px" >
                    <mj-image src="cid:call"/>
                    +1 234 568 8897
                    </mj-text>
                </mj-column>
            </mj-section>
            <mj-section background-color="white" padding="24px" padding-top="0px">
                <mj-group width="60%">
                    <mj-column width="107px">
                        <mj-image src="cid:footerLogo" padding="0" margin="0" font-size="14px" color="#0071CE" font-weight="700"  line-height="18px" padding-bottom="25px" alt="here"/>
                    </mj-column>
                </mj-group>
                <mj-group width="40%">
                    <mj-column >
                        <mj-image src="cid:twitter" padding="0" margin="0" width="24px" alt="here"/>
                    </mj-column>
                    <mj-column >
                        <mj-image src="cid:twitter" padding="0" margin="0" width="24px" alt="here" />
                    </mj-column>
                    <mj-column  >
                        <mj-image src="cid:twitter" padding="0" margin="0" width="24px" alt="here"/>
                    </mj-column>
                </mj-group>

            </mj-section>
        </mj-section>
      </mj-body>
    </mjml>
  `)

  try {
    fs.writeFileSync('./views/quoteRequest.ejs', htmlOutput.html)
    console.log('init')
  } catch (error) {
    console.log(error)
  }
//   console.log(htmlOutput)