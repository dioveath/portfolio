// interface Work {
//     imgSrc: String;
//     alt: String;
//     title: String;
//     desc: String;
//     liveLink: JSX.Element;
//     gitLink: String;
//     techStack: JSX.Element
// }

interface Work {
    name: string;        
    description: string;
    avatar: string;
    cover: string;
    techStack: string[];
    liveLink: string;
    gitLink?: string;
}




export type { Work };