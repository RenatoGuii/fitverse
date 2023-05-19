// Images
import tp1 from "../../assets/images/tp1.jpg";
import tp2 from "../../assets/images/tp2.jpg";
import tp3 from "../../assets/images/tp3.jpg";
import tp4 from "../../assets/images/tp4.jpg";

const TrainingPlan = () => {
  return (
      <div className="container trainingPlan">
        <div className="text-tp">
          <h2>
            Monte seu plano <br /> de treinos
          </h2>
          <p>
            Utilize nosso sistema para montar seu plano de treino baseado nos filtros que você mais gosta.
          </p>
          <input type="submit" value="Experimentar" />
        </div>
        <div className="images-desktop">
          <img id="tp1" className="images-tp-desktop" src={tp1} alt="imagens de academia 1" />
          <img id="tp2" className="images-tp-desktop" src={tp2} alt="imagens de academia 2" />
          <img id="tp3" className="images-tp-desktop" src={tp3} alt="imagens de academia 3" />
        </div>

        <div className="images-mobile">
          <img className="images-tp-mobile" src={tp4} alt="imagens de academia 4"  />
        </div>

      </div>
  );
};

export default TrainingPlan;
