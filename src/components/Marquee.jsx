import './Marquee.css';

const TECHS = ['JAVASCRIPT','REACT.JS','NODE.JS','PYTHON','MONGODB','CSS3','HTML5','REST API','GIT','FULL STACK DEVELOPER'];

export default function Marquee() {
  const text = TECHS.map(t => `\u00a0\u00a0${t} \u2746`).join(' ');
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">{text}{text}</div>
    </div>
  );
}
