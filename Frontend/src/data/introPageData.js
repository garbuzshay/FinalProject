import LogoMusuem from "../assets/LogoMusuem.png";
import People from "../assets/people.png";
import Symbols from "../assets/Symbols.png";
import design from "../assets/design.png";
import introPage2 from "../assets/IntroPage2.png";


;
// https://static.wixstatic.com/media/2ec3d9_7a478049133347e1857c70ffcfa97df5~mv2.png/v1/fill/w_274,h_214,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2ec3d9_7a478049133347e1857c70ffcfa97df5~mv2.png
const introPageData = [
  {
    logoSrc: LogoMusuem,
    title: "CREATE AN APP FOR YOUR MUSEUM",
    explanation:
      "Transform your museum with our Interactive Guide! Manage exhibits and engage visitors using our user-friendly app.",
    imageSrc: People,
  },
  {
    logoSrc: LogoMusuem,
    title: "EDIT, UPLOAD AND RECORD",
    explanation:
      "Edit, upload, and record content effortlessly. Capture audio, video, and photos on your mobile device to manage exhibits and engage visitors.",
    imageSrc: introPage2,
  },
  {
    logoSrc: LogoMusuem,
    title: "CREATE YOUR VIRTUAL MUSUEM",
    explanation:   "Get ready to embark on a journey! Prepare to create, upload, and manage content seamlessly as you bring your museum to life.",
    imageSrc: design,
    nextButtonText: "Let's Start",
  },
];

export default introPageData;
