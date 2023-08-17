import React, { useState } from "react";
import cn from "classnames";
import styles from "./PopularProducts.module.sass";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import ModalProduct from "../../../components/ModalProduct";

const thématiques = [
  
  
  {
    title: "Gestion du stress ",
    active: true,
    price:"22",
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
  {
    title: "Gestion du temps et organisation",
    price:"4",
    active: true,
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
  {
    title: "Communication efficace ",
    price:"2",
    active: true,
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
  {
    title: "Confiance en soi et estime de soi",
    price:"1",
    active: true,
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },  
  
  
];

const PopularTheme = ({ className, views }) => {
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Domaine de coaching   "
        classTitle="title-blue"
      >
        <div className={styles.popular}>
          <div className={styles.head}>
            <div className={styles.stage}> Séance de coaching pour chaque Domaine</div>
            <div className={styles.stage}></div>
          </div>
          <div className={styles.list}>
            {thématiques.map(
              (x, index) =>
                views > index && (
                  <div
                    className={styles.item}
                    key={index}
                    onClick={() => setVisibleModalProduct(true)}
                  >
                    <div className={styles.preview}>
                      <img
                        srcSet={`${x.image2x} 2x`}
                        src={x.image}
                        alt="Product"
                      />
                    </div>
                    <div className={styles.title}>{x.title}</div>
                    <div className={styles.details}>
                      <div className={styles.price}>{x.price}</div>
                      {x.active ? (
                        <div className={cn("status-green", styles.status)}>
                          
                        </div>
                      ) : (
                        <div className={cn("status-red", styles.status)}>
                          
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <Link
            className={cn("button-stroke", styles.button)}
            to="/shop"
          >
            Tout les domaines 
          </Link>
        </div>
      </Card>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}   
      />
    </>
  );
};

export default PopularTheme;
