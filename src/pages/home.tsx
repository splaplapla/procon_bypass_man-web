/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useEffect } from "react";

export const Home = () => {
  return (
    <>
      <div
        css={css`
          margin-top: 30px;
        `}
      >
        ソースコード:{" "}
        <a href="https://github.com/splaplapla/procon_bypass_man-web">
          https://github.com/splaplapla/procon_bypass_man-web
        </a>
      </div>
    </>
  );
};
