// import React, { useState } from "react";
// import cn from "classnames";
// import { Link } from "react-router-dom";
// import styles from "./Enregistrement.module.sass";
// import Card from "../../components/Card";
// import Icon from "../../components/Icon";
// import TextInput from "../../components/TextInput";
// import Editor from "../../components/Editor";
// <<<<<<< HEAD
// import Dropdown from "../../components/Dropdown"
// import File from "../../components/File";
// import Checkbox from "../../components/Checkbox";
// const compatibility = [
//     {
//       id: 0,
//       title: "Homme",
//     },
//     {
//       id: 1,
//       title: "Femme",
//     },
    
//   ];
  
// const optionsNationalité= ["France", "Belgique", "Espagne", "Portuga"];
// const navigation = ["Candidate", "Mentor", "Coach", "Entreprise"];
// const optionsCivilite = ["M.", "Mme.", "Mlle."];
// const optionsAge = ["Majeur", "Mineur"];
// const Enregistrement = ({ className }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [content, setContent] = useState();
//     const [civilite, setCivilite] = useState(optionsCivilite[0]);
//     const [Nationalité, setNationalité] = useState(optionsNationalité[0]);

//     const [age, setage] = useState(optionsAge[0]);

//     return (
//         <>  
//             <div className={styles.shop}>
//                 {/* <div className={styles.background}>
//                     <img src="/images/content/bg-shop.jpg" alt="Background" />
//                 </div> */}
//                 <Card className={styles.card}>
//                     {/* <Profile /> */}
//                     <div className={styles.control}>
//                         <div className={styles.nav}>
//                             {navigation.map((x, index) => (
//                                 <button
//                                     className={cn(styles.link, {
//                                         [styles.active]: index === activeIndex,
//                                     })}
//                                     onClick={() => setActiveIndex(index)}
//                                     key={index}
//                                 >
//                                     {x}
//                                 </button>
//                             ))}
//                         </div>
//                         {/* <div className={styles.dropdownBox}>
// =======
// import Dropdown from "../../components/Dropdown";
// import { set } from "date-fns";
// import File from "../../components/File";

// const navigation = ["Candidate", "Mentor", "Coach", "Entreprise"];
// const optionsCivilite = ["M.", "Mme.", "Mlle."];
// const Enregistrement = ({ className }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [content, setContent] = useState();
//   const [purchase, setPurchase] = useState(optionsPurchase[0]);
//   const [civilite, setCivilite] = useState(optionsCivilite[0]);

//   return (
//     <>
//       <div className={styles.shop}>
//         {/* <div className={styles.background}>
//                     <img src="/images/content/bg-shop.jpg" alt="Background" />
//                 </div> */}
//         <Card className={styles.card}>
//           {/* <Profile /> */}
//           <div className={styles.control}>
//             <div className={styles.nav}>
//               {navigation.map((x, index) => (
//                 <button
//                   className={cn(styles.link, {
//                     [styles.active]: index === activeIndex,
//                   })}
//                   onClick={() => setActiveIndex(index)}
//                   key={index}
//                 >
//                   {x}
//                 </button>
//               ))}
//             </div>
//             {/* <div className={styles.dropdownBox}>
// >>>>>>> 77eb4350f5076346d547e4f31cceb521cec5f649
//                             <Dropdown
//                                 className={styles.dropdown}
//                                 classDropdownHead={styles.dropdownHead}
//                                 value={sorting}
//                                 setValue={setSorting}
//                                 options={intervals}
//                                 small
//                             />
//                         </div>
//                         <Filters
//                             className={styles.filters}
//                             title="Showing 9 of 32 products"
//                         >
//                             <Settings />
//                         </Filters> */}
// <<<<<<< HEAD
//                     </div>
//                     <div className={styles.wrap}>
//                         {activeIndex === 0 && (
//                             <>
                               
                                  
                                
//                                     <div className={styles.group} >
                                 
//                                     <div className={styles.list}>
//                                        {compatibility.map((x, index) => (
//                                          <Checkbox
//                                          className={styles.checkbox}
//                                          content={x.title}
//                                          value={selectedFilters.includes(x.id)}
//                                          onChange={() => handleChange(x.id)}
//                                          key={index}
//                                          />
//           ))}
//         </div>
//                                         <Dropdown
//                                             className={styles.field}
//                                             label="Nationalité"
//                                             tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                             value={Nationalité}
//                                            setValue={setNationalité}
//                                            options={optionsNationalité}
//                                            />
//                                         <div className={styles.group}>
                                       
                                        
                                           
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Nom"
//                                                 name="nom"
//                                                 type="text"
//                                                 placeholder="Nom"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 label="Prenom"
//                                                 name="prenom"
//                                                 type="text"
//                                                 placeholder="Prenom"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="email"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 name="email"
//                                                 type="text"
//                                                 placeholder="example@example.com"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="telephone"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"classInput
//                                                 name="telephone"
//                                                 type="tel"
//                                                 placeholder="+33 12345678"
//                                                 required
//                                             />
                                            
//                                              <TextInput
//                                                 className={styles.field}
//                                                 label="Date naissnace"
//                                                 name="Date"
//                                                 type="Date"
//                                                 placeholder="Nom"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 required
//                                             />
//                                             <Dropdown
//                                              className={styles.field}
//                                              label="Majeur/Mineur"
//                                              tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                              value={age}
//                                              setValue={setage}
//                                              options={optionsAge}
//                                             />
                                        
                                            
//                                          { age =="Mineur"&& 
//                                          <>
//                                           <TextInput
//                                                 className={styles.field}
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 label="Nom parant 1"
//                                                 name="Nom parant 1"
//                                                 type="text"
//                                                 placeholder="Nom parant 1"
//                                                 required
//                                             />
//                                              <TextInput
//                                                 className={styles.field}
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 label="Prenom parant 1"
//                                                 name="Prenom parant 1"
//                                                 type="text"
//                                                 placeholder="Prenom parant 1"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Email parant 1"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 name="email"
//                                                 type="text"
//                                                 placeholder="example@example.com"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Telephone parant 1"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"classInput
//                                                 name="telephone"
//                                                 type="tel"
//                                                 placeholder="+33 12345678"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Adress 1"
//                                                 name="Adress"
//                                                 type="text"
//                                                 placeholder="Adress"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 label="Nom parant 2"
//                                                 name="Nom parant 2"
//                                                 type="text"
//                                                 placeholder="Nom parant 2"
//                                                 required
//                                             />
//                                              <TextInput
//                                                 className={styles.field}
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 label="Prenom parant 2"
//                                                 name="Prenom parant 2"
//                                                 type="text"
//                                                 placeholder="Prenom parant 2"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Email parant 2"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 name="email"
//                                                 type="text"
//                                                 placeholder="example@example.com"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Telephone parant 2"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"classInput
//                                                 name="telephone"
//                                                 type="tel"
//                                                 placeholder="+33 12345678"
//                                                 required
//                                             />
//                                             <TextInput
//                                                 className={styles.field}
//                                                 label="Adress 2"
//                                                 name="Adress"
//                                                 type="text"
//                                                 placeholder="Adress"
//                                                 tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                                 required
//                                             />
//                                          </>
 
//                                          }
//                                           <File
//                                             className={styles.field}
//                                             title="Click or drop Fichier"
//                                             label="Dossier Medical "
//                                             tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                                            />
                                           
       
                                              
//                                         </div>
//                                         <Editor
//                                              state={content}
//                                              onChange={setContent}
//                                              classEditor={styles.editor}
//                                              label="Motivation"
//                                              tooltip="Description Message to reviewer"
//                                            /> 
//                                     </div>
                               
//                             </>
//                         )}
//                         {activeIndex === 1 && (
//                             <>
//                                 <div className={styles.followers}>
//                                     {/* {followers.map((x, index) => (
//                                         <Follower
//                                             className={styles.follower}
//                                             item={x}
//                                             key={index}
//                                             followers
//                                         />
//                                     ))} */}
//                                 </div>
//                                 <div className={styles.foot}>
//                                     {/* <button
//                                         className={cn("button-stroke button-small", styles.button)}
//                                     >
//                                         Load more
//                                     </button> */}
//                                 </div>
//                             </>
//                         )}
//                         {activeIndex === 2 && (
//                             <>
//                                 <div className={styles.followers}>
//                                     {/* {followers.map((x, index) => (
//                                         <Follower
//                                             className={styles.follower}
//                                             item={x}
//                                             key={index}
//                                         />
//                                     ))} */}
//                                 </div>
//                                 <div className={styles.foot}>
//                                     {/* <button
//                                         className={cn("button-stroke button-small", styles.button)}
//                                     >
//                                         Load more
//                                     </button> */}
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </Card>
//             </div>
//         </>
//     );
// };

// export default Enregistrement;
// =======
//           </div>
//           <div className={styles.wrap}>
//             {activeIndex === 0 && (
//               <>
//                 <div className={styles.description}>
//                   <div className={styles.group}>
//                     <TextInput
//                       className={styles.field}
//                       label="Nom"
//                       name="nom"
//                       type="text"
//                       placeholder="Nom"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       required
//                     />
//                     <TextInput
//                       className={styles.field}
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       label="Prenom"
//                       name="prenom"
//                       type="text"
//                       placeholder="Prenom"
//                       required
//                     />
//                     <TextInput
//                       className={styles.field}
//                       label="email"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       name="email"
//                       type="text"
//                       placeholder="example@example.com"
//                       required
//                     />
//                     <TextInput
//                       className={styles.field}
//                       label="telephone"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       classInput
//                       name="telephone"
//                       type="tel"
//                       placeholder="+33 12345678"
//                       required
//                     />

//                     <TextInput
//                       className={styles.field}
//                       label="Date naissnace"
//                       name="Date"
//                       type="Date"
//                       placeholder="Nom"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       required
//                     />
//                     <TextInput
//                       className={styles.field}
//                       label="Nationalité"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       name="Nationalité"
//                       type="text"
//                       placeholder=""
//                       required
//                     />

//                     <Dropdown
//                       className={styles.field}
//                       label="Dropdown"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                       value={purchase}
//                       setValue={setPurchase}
//                       options={optionsPurchase}
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//             {activeIndex === 1 && (
//               <>
//                 <div className={styles.group}>
//                   <TextInput
//                     className={styles.field}
//                     label="Nom"
//                     name="nom"
//                     type="text"
//                     placeholder="Nom"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     label="Prenom"
//                     name="prenom"
//                     type="text"
//                     placeholder="Prenom"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="E-mail"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder="example@example.com"
//                     required
//                   />
//                   <Dropdown
//                     className={styles.field}
//                     label="Civilité"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     value={civilite}
//                     setValue={setCivilite}
//                     options={optionsCivilite}
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Telephone"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     classInput
//                     name="telephone"
//                     type="tel"
//                     placeholder="+33 12345678"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Domaine d'action"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Historique"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Métier"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />

//                   <div className={styles.files}>
//                     <File
//                       className={styles.field}
//                       title="Click or drop your cv"
//                       label="CV"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     />
//                   </div>
//                 </div>
//                 <Editor
//                   state={content}
//                   onChange={setContent}
//                   classEditor={styles.editor}
//                   label="Motivation"
//                   tooltip="Motivation"
//                 />
//               </>
//             )}

//             {activeIndex === 2 && (
//               <>
//                 <div className={styles.group}>
//                   <TextInput
//                     className={styles.field}
//                     label="Nom"
//                     name="nom"
//                     type="text"
//                     placeholder="Nom"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     label="Prenom"
//                     name="prenom"
//                     type="text"
//                     placeholder="Prenom"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="E-mail"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder="example@example.com"
//                     required
//                   />
//                   <Dropdown
//                     className={styles.field}
//                     label="Civilité"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     value={civilite}
//                     setValue={setCivilite}
//                     options={optionsCivilite}
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Telephone"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     classInput
//                     name="telephone"
//                     type="tel"
//                     placeholder="+33 12345678"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Domaine d'action"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Historique"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Métier"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     name="email"
//                     type="text"
//                     placeholder=""
//                     required
//                   />

//                   <div className={styles.files}>
//                     <File
//                       className={styles.field}
//                       title="Click or drop your cv"
//                       label="CV"
//                       tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     />
//                   </div>
//                 </div>
//                 <Editor
//                   state={content}
//                   onChange={setContent}
//                   classEditor={styles.editor}
//                   label="Motivation"
//                   tooltip="Motivation"
//                 />
//               </>
//             )}
//             {activeIndex === 3 && (
//               <>
//                 <div className={styles.group}>
//                   <TextInput
//                     className={styles.field}
//                     label="Nom"
//                     name="value1"
//                     type="text"
//                     placeholder="Nom de l'entreprise"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Raison Sociale"
//                     name="value2"
//                     type="text"
//                     placeholder="Dénomination Sociale"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="SIRET"
//                     name="value3"
//                     type="text"
//                     placeholder="Exemple: 552 178 639 00132"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Code APE"
//                     name="value4"
//                     type="text"
//                     placeholder="Exemple: 4765B"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Site Web"
//                     name="value5"
//                     type="text"
//                     placeholder="Exemple: www.monentreprise.com"
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Page de recrutement"
//                     name="title"
//                     type="text"
//                     placeholder="Exemple: www.monentreprise.com/recrutement"
//                   />

//                   <TextInput
//                     className={styles.field}
//                     label="Effectif"
//                     name="value7"
//                     type="number"
//                     required
//                   />
//                   <TextInput
//                     className={styles.field}
//                     label="Adresse"
//                     name="title"
//                     type="text"
//                     placeholder="Adresse de l'entreprise"
//                     tooltip="Maximum 100 characters. No HTML or emoji allowed"
//                     required
//                   />
//                 </div>

//                 <Editor
//                   state={content}
//                   onChange={setContent}
//                   classEditor={styles.editor}
//                   label="Politique Handicap"
//                   tooltip="Politique Handicap"
//                 />
//               </>
//             )}
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Enregistrement;
// >>>>>>> 77eb4350f5076346d547e4f31cceb521cec5f649
