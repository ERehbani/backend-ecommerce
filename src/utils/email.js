const nodemailer = require("nodemailer");

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "eliancoderhouse@gmail.com",
        pass: "mvrs dgwe ixfy gzam",
      },
    });
  }

  async sendMailResetPassword(email, first_name, token) {
    try {
      const mailOptions = {
        from: "eliancoderhouse@gmail.com",
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `<tbody>
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              role="none"
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
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#bcb8b1"
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        width: 600px;
                      ">
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 520px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="none"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              display: none;
                                            "></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#efefef"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #efefef;
                        border-radius: 20px 20px 0 0;
                        width: 600px;
                      "
                      role="none">
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-top: 40px;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 520px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="left"
                                            class="es-m-txt-c"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              font-size: 0px;
                                            ">
                                            <a
                                              target="_blank"
                                              href="https://viewstripo.email"
                                              style="
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                text-decoration: underline;
                                                color: #2d3142;
                                                font-size: 18px;
                                              "
                                              ><img
                                                src="https://eikiksn.stripocdn.email/content/guids/CABINET_ee77850a5a9f3068d9355050e69c76d26d58c3ea2927fa145f0d7a894e624758/images/group_4076323.png"
                                                alt="Confirm email"
                                                style="
                                                  display: block;
                                                  border: 0;
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                  border-radius: 100px;
                                                "
                                                width="100"
                                                title="Confirm email"
                                            /></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-top: 20px;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 520px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      bgcolor="#fafafa"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: separate;
                                        border-spacing: 0px;
                                        background-color: #fafafa;
                                        border-radius: 10px;
                                      "
                                      role="presentation">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="left"
                                            style="padding: 20px; margin: 0">
                                            <h3
                                              style="
                                                margin: 0;
                                                line-height: 34px;
                                                mso-line-height-rule: exactly;
                                                font-family: Imprima, Arial,
                                                  sans-serif;
                                                font-size: 28px;
                                                font-style: normal;
                                                font-weight: bold;
                                                color: #2d3142;
                                              ">
                                              Bienvenido,&nbsp;${first_name}
                                            </h3>
                                            <p
                                              style="
                                                margin: 0;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                font-family: 'open sans',
                                                  'helvetica neue', helvetica,
                                                  arial, sans-serif;
                                                line-height: 27px;
                                                color: #2d3142;
                                                font-size: 18px;
                                              ">
                                              <br />
                                            </p>
                                            <p
                                              style="
                                                margin: 0;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                font-family: 'open sans',
                                                  'helvetica neue', helvetica,
                                                  arial, sans-serif;
                                                line-height: 27px;
                                                color: #2d3142;
                                                font-size: 18px;
                                              ">
                                              Este email es para reestablecer su
                                              contraseña en su cuenta en el
                                              Ecommerce de Coderhouse realizado
                                              por Elián Rehbani, copie este codigo
                                              para establecer su nueva contraseña
                                            </p>
                                            <p
                                              style="
                                                margin: 0;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                font-family: 'open sans',
                                                  'helvetica neue', helvetica,
                                                  arial, sans-serif;
                                                line-height: 27px;
                                                color: #2d3142;
                                                font-size: 18px;
                                              ">
                                              <br />
                                            </p>
                                            <p
                                              style="
                                                margin: 0;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                font-family: 'open sans',
                                                  'helvetica neue', helvetica,
                                                  arial, sans-serif;
                                                line-height: 27px;
                                                color: #2d3142;
                                                font-size: 18px;
                                              ">
                                              <br />
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#efefef"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #efefef;
                        width: 600px;
                      ">
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 30px;
                              padding-bottom: 40px;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 520px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="padding: 0; margin: 0">
                                            <p
                                              style="
                                                margin: 0;
                                                -webkit-text-size-adjust: none;
                                                -ms-text-size-adjust: none;
                                                mso-line-height-rule: exactly;
                                                font-family: 'open sans',
                                                  'helvetica neue', helvetica,
                                                  arial, sans-serif;
                                                line-height: 27px;
                                                color: #020202;
                                                font-size: 24px;
                                                font-weight: 800;
                                              ">
                                              ${token}
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="padding: 0; margin: 0; width: 520px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="padding: 0; margin: 0">
                                            <span
                                              class="msohide es-button-border"
                                              style="
                                                border-style: solid;
                                                border-color: #2cb543;
                                                background: #7630f3;
                                                border-width: 0px;
                                                display: block;
                                                border-radius: 30px;
                                                width: auto;
                                                mso-hide: all;
                                              "
                                              ><a
                                                href="http://localhost:8080/change-password"
                                                class="es-button msohide"
                                                target="_blank"
                                                style="
                                                  mso-style-priority: 100 !important;
                                                  text-decoration: none;
                                                  -webkit-text-size-adjust: none;
                                                  -ms-text-size-adjust: none;
                                                  mso-line-height-rule: exactly;
                                                  color: #ffffff;
                                                  font-size: 22px;
                                                  padding: 15px 20px 15px 20px;
                                                  display: block;
                                                  background: #36648B;
                                                  border-radius: 30px;
                                                  font-family: Imprima, Arial,
                                                    sans-serif;
                                                  font-weight: bold;
                                                  font-style: normal;
                                                  line-height: 26px;
                                                  width: auto;
                                                  text-align: center;
                                                  mso-padding-alt: 0;
                                                  mso-border-alt: 10px solid
                                                  #36648B;
                                                  mso-hide: all;
                                                  padding-left: 5px;
                                                  padding-right: 5px;
                                                "
                                                >Reestablecer contraseña</a
                                              ></span
                                            ><!--<![endif]-->
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-bottom: 20px;
                                              padding-top: 40px;
                                              font-size: 0;
                                            ">
                                            <table
                                              border="0"
                                              width="100%"
                                              height="100%"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                              ">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      padding: 0;
                                                      margin: 0;
                                                      border-bottom: 1px solid
                                                        #666666;
                                                      background: unset;
                                                      height: 1px;
                                                      width: 100%;
                                                      margin: 0px;
                                                    "></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              role="none"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#efefef"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #efefef;
                        border-radius: 0 0 20px 20px;
                        width: 600px;
                      "
                      role="none">
                      <tbody>
                        <tr>
                          <td
                            class="esdev-adapt-off"
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              padding-left: 40px;
                              padding-right: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              class="esdev-mso-table"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                width: 520px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    class="esdev-mso-td"
                                    valign="top"
                                    style="padding: 0; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      align="left"
                                      class="es-left"
                                      role="none"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        float: left;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              width: 47px;
                                            ">
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                              ">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="
                                                      padding: 0;
                                                      margin: 0;
                                                      font-size: 0px;
                                                    ">
                                                    <img
                                                      class="adapt-img"
                                                      src="https://eikiksn.stripocdn.email/content/guids/78076dc2-b94a-41ed-b61e-de0db9ff4a41/images/r8c1pf7.PNG"
                                                      alt=""
                                                      style="
                                                        display: block;
                                                        border: 0;
                                                        outline: none;
                                                        text-decoration: none;
                                                        -ms-interpolation-mode: bicubic;
                                                      "
                                                      width="47" />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      width: 20px;
                                    "></td>
                                  <td
                                    class="esdev-mso-td"
                                    valign="top"
                                    style="padding: 0; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-right"
                                      align="right"
                                      role="none"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        float: right;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              width: 453px;
                                            ">
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                border-collapse: collapse;
                                                border-spacing: 0px;
                                              ">
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    style="padding: 0; margin: 0">
                                                    <p
                                                      style="
                                                        margin: 0;
                                                        -webkit-text-size-adjust: none;
                                                        -ms-text-size-adjust: none;
                                                        mso-line-height-rule: exactly;
                                                        font-family: 'open sans',
                                                          'helvetica neue',
                                                          helvetica, arial,
                                                          sans-serif;
                                                        line-height: 24px;
                                                        color: #2d3142;
                                                        font-size: 16px;
                                                      ">
                                                      Este token expira en 1 hora
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              role="none"
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
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#bcb8b1"
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        width: 600px;
                      ">
                      <tbody>
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-bottom: 30px;
                              padding-top: 40px;
                            ">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 560px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="none"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              display: none;
                                            "></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              role="none"
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
              ">
              <tbody>
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#ffffff"
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        width: 600px;
                      ">
                      <tbody>
                        <tr>
                          <td align="left" style="padding: 20px; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="none"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              ">
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="padding: 0; margin: 0; width: 560px">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="none"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      ">
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              display: none;
                                            "></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>${token}`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error al enviar correo electronico", error);
      throw new Error("Error al enviar correo electronico");
    }
  }
}

module.exports = EmailManager;
