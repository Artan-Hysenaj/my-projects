import classes from "./MeetupDetail.module.css";
const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt="https://picsum.photos/800" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};


export default MeetupDetail;
