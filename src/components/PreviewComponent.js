import React from "react";

const PreviewComponent = ({ description }) => (
  <div className="flex flex-col justify-between py-1 callScript overflow-auto h-85v">
    <div
      dangerouslySetInnerHTML={{
        __html: `
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8" />
                                <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
                                />
                                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                                <link
                                href="https://fonts.googleapis.com/css?family=Roboto"
                                rel="stylesheet"
                                />
                                <title>Business Partner | Fincity</title>
                                <!-- Stylesheets-->
                                <style>
                                html,
                                body {
                                    margin: 0;
                                    padding: 0;
                                }
                                .previewStyles ul{
                                  list-style-type: disc !important;
                                  margin-left: 18px;
                                }
                                .previewStyles ol{
                                  list-style-type: decimal;
                                  margin-left: 18px;
                                }
                                .previewStyles h3{
                                  font-size: x-large;
                                  font-weight: 500;
                                  margin-top: 4px;
                                }
                                </style>
                            </head>
                            <body>
                                <div
                                    style="
                                        position: relative;
                                        margin: auto;
                                        height: auto;
                                        padding: 0px;
                                        font-family: 'Roboto';
                                        font-size: 16px;
                                        color: #000000;
                                        background: #f4f6f7;
                                        padding: 25px 0;
                                    "
                                >
                                    <div
                                        style="
                                            position: relative;
                                            margin: auto;
                                            padding-left: 45px;
                                            padding-right: 45px;
                                        "
                                    >
                                        <div class="previewStyles">${description}</div>
                                    </div>
                                </div>
                            </body>
                        </html>
                    `,
      }}
    />
  </div>
);

export default PreviewComponent;
