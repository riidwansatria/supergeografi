import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn"
import { faLine } from "@fortawesome/free-brands-svg-icons/faLine"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp"

import {
  FacebookShareButton,
  LinkedinShareButton,
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

const ShareButtons = ({ url, title, description }) => (
  <div className="flex gap-4 sm:gap-8 items-center">
    <span className="hidden sm:flex text-gray-6 hover:text-gray-4">Bagikan:</span>
    <ul className="flex gap-4 items-center">
      <li key="facebook">
        <FacebookShareButton url={url}>
          <FontAwesomeIcon className="text-gray-6 hover:text-gray-4" icon={faFacebook} />
        </FacebookShareButton>
      </li> 
      <li key="linkedin">
        <LinkedinShareButton url={url} title={title} summary={description}>
          <FontAwesomeIcon className="text-gray-6 hover:text-gray-4" icon={faLinkedinIn} />
        </LinkedinShareButton>
      </li> 
      <li key="line">
        <LineShareButton url={url}>
          <FontAwesomeIcon className="text-gray-6 hover:text-gray-4" icon={faLine} />
        </LineShareButton>
      </li> 
      <li key="twitter">
        <TwitterShareButton url={url}>
          <FontAwesomeIcon className="text-gray-6 hover:text-gray-4" icon={faTwitter} />
        </TwitterShareButton>
      </li> 
      <li key="whatsapp">
        <WhatsappShareButton url={url}>
          <FontAwesomeIcon className="text-gray-6 hover:text-gray-4" icon={faWhatsapp} />
        </WhatsappShareButton>
      </li> 
    </ul>
  </div>
  
);

export default ShareButtons