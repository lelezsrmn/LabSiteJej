import '../../index.css';
import profilepict from "../../assets/profile_pict.jpg"

function Card() {
    return (
      <div className="card">
          <img className="card_img" src={profilepict} alt="profile pict"></img>
          <h2>Zizzman</h2>
          <p>i play warthunder</p>
      </div>
    );
}

export default Card