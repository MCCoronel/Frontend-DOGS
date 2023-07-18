import style from "./Detail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import imageArrow from "../../../assets/goBack.png";
import imgLP from "../../../assets/lifeSpan.png";
import imgW from "../../../assets/weight.png";
import imgH from "../../../assets/height.png";
import imgTemp from  "../../../assets/temp.png";
import imgBG from "../../../assets/breedGroup.png";

const Detail = () => {
  const { id } = useParams();

  useEffect(() => {
    const endpoint = `http://localhost:3001/dogs/${id}`;
    axios
      .get(endpoint)
      .then(({ data }) => {
        if (data[0].name) {
          setBreed(data[0]);
        } else {
          window.alert("Breed not found");
        }
      })
      .catch((error) => {
        console.log(error.message);
        window.alert("Error getting breed data");
      });
  }, [id]);

  const [breed, setBreed] = useState({});

  const navigate = useNavigate();
  console.log(navigate);

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className={style.contenedorPadre}>
      <div className={style.container1}>
        <div className={style.containerName}>
          <div onClick={handleClick} className={style.buttonBack}>
            <img src={imageArrow} alt="arrow" className={style.arrow} />
          </div>
          <h1 className={style.name}>{breed.name}</h1>
        </div>

        <div className={style.container2}>
          <div className={style.imageContainer}>
            <img src={breed.image} alt="Dog" className={style.image} />
          </div>

          <div className={style.infoContainer}>
            <h2 className={style.characteristic1}>Breed characteristics</h2>

            <div className={style.characteristicContainer}>
              <p>
                <div className={style.characteristic}><img src={imgH} alt="weight" className={style.img} /> Height: </div>
                {breed.minHeight} - {breed.maxHeight} cm
              </p>

              <p>
                <div className={style.characteristic}><img src={imgW} alt="weight" className={style.img} /> Weight:</div>
                {breed.minWeight} - {breed.maxWeight} kg
              </p>

              <p>
                <div className={style.characteristic}><img src={imgLP} alt="weight" className={style.img} /> Life Span: </div>
                {breed.minLifeSpan} - {breed.maxLifeSpan} years
              </p>

              <p>
                <div className={style.characteristic}><img src={imgBG} alt="weight" className={style.img} /> Breed Group: </div>
                {breed.breed_group}
              </p>
              {breed.temperaments ? (
                <p>
                  <div className={style.characteristic}><img src={imgTemp} alt="weight" className={style.img} /> Temperaments: </div>
                  {breed.Temperament?.join(", ")}
                </p>
              ) : (
                <p>
                  <div className={style.characteristic}><img src={imgTemp} alt="weight" className={style.img} /> Temperaments:</div>
                  {breed.Temperaments?.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;