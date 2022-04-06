import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import CostumModal from "../../shared/CostumModal";
import Featured from "./Featured";
import useMoviesContext from "../../../hooks/useMoviesContext";
import { useHistory } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import { useContext, useState } from "react";
import CartContext from "../../../context/cart-context";
import Toaster from "../../shared/Toaster";
const Movie = (props) => {
  const { movie } = props;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { handleDelete, error, handleClearError } = useMoviesContext();
  const { isAuthenticated, isAdmin } = useAuthContext();
  const cartContext = useContext(CartContext);

  const disableAddToCart = Boolean(
    cartContext.items.find((item) => item._id === movie._id)
  );

  const handleDeleteClick = () => {
    handleDelete(movie._id);
  };

  const handleEdit = () => {
    history.push(`/movies/edit/${movie._id}`);
  };

  const adminActions = isAdmin && (
    <div>
      <Button color="primary" style={{ marginRight: 15 }} onClick={handleEdit}>
        Edit
      </Button>
      <Button color="danger" onClick={() => setShowModal(true)}>
        Delete
      </Button>
    </div>
  );

  const userActions = !isAdmin && (
    <div>
      <Button
        color="success"
        onClick={() => cartContext.addItem(movie)}
        disabled={disableAddToCart}
      >
        {!disableAddToCart ? "Add to cart" : "In Cart"}
      </Button>
    </div>
  );
  return (
    <>
      <CostumModal
        toggle={() => setShowModal(!showModal)}
        isOpen={showModal}
        title="Delete Movie"
        body={`Do you really wish to delete ${movie.title}`}
      >
        <Toaster isOpen={!!error} icon="danger" title={error} />
        <Button
          onClick={() => {
            setShowModal(false);
            handleClearError();
          }}
        >
          Cancel
        </Button>
        <Button color="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </CostumModal>
      <Col md={3} className="mb-5">
        <Card style={{ maxHeight: "590px" }}>
          {isAuthenticated && isAdmin && (
            <Featured movieId={movie._id} isFeatured={movie.featured} />
          )}

          <CardImg
            alt="Card image cap"
            src={movie.img ?? "https://picsum.photos/256/186"}
            top
            width="100%"
            height="250px"
          />

          <CardBody>
            <CardTitle tag="h5">{movie.title}</CardTitle>
            <CardText>Director: {movie.director}</CardText>
            <CardText className="blockquote-footer ">
              Duration: {movie.duration}min
            </CardText>
            <CardText>Price: {movie.price}$</CardText>

            {isAuthenticated && (
              <>
                {adminActions}
                {userActions}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Movie;
