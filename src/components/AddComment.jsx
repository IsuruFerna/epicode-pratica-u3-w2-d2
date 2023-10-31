import { useState, Component } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
   // state = {
   //    comment: {
   //       comment: "",
   //       rate: 1,
   //       elementId: this.props.asin,
   //    },
   // };

   console.log("add comment", asin);

   // const idElemant = asin;

   const [state, setState] = useState({
      comment: {
         comment: "",
         rate: 1,
         elementId: asin,
      },
   });

   // useEffect(() => {
   //    sendComment();
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [asin]);

   // componentDidUpdate(prevProps) {
   //    if (prevProps.asin !== this.props.asin) {
   //       this.setState({
   //          comment: {
   //             ...this.state.comment,
   //             elementId: this.props.asin,
   //          },
   //       });
   //    }
   // }

   const sendComment = function (e) {
      e.preventDefault();

      fetch("https://striveschool-api.herokuapp.com/api/comments", {
         method: "POST",
         body: JSON.stringify(state.comment),
         headers: {
            "Content-type": "application/json",
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzVkYWY2ZTNkZDAwMTQ5NWU0OWQiLCJpYXQiOjE2OTgzMzAwNzQsImV4cCI6MTY5OTUzOTY3NH0.tYZsMhhS_yqnCH1v4ULCoAeBdA9DXGK1tTakH4XmpPM",
         },
      })
         .then((response) => {
            if (response.ok) {
               alert("Recensione inviata!");
               setState({
                  comment: {
                     comment: "",
                     rate: 1,
                     elementId: asin,
                  },
               });
            } else {
               throw new Error("Qualcosa è andato storto");
            }
         })
         .catch((err) => alert(err));

      // try {
      //    let response = await fetch(
      //       "https://striveschool-api.herokuapp.com/api/comments",
      //       {
      //          method: "POST",
      //          body: JSON.stringify(state.comment),
      //          headers: {
      //             "Content-type": "application/json",
      //             Authorization:
      //                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzVkYWY2ZTNkZDAwMTQ5NWU0OWQiLCJpYXQiOjE2OTgzMzAwNzQsImV4cCI6MTY5OTUzOTY3NH0.tYZsMhhS_yqnCH1v4ULCoAeBdA9DXGK1tTakH4XmpPM",
      //          },
      //       }
      //    );
      //    if (response.ok) {
      //       alert("Recensione inviata!");
      //       setState({
      //          comment: {
      //             comment: "",
      //             rate: 1,
      //             elementId: asin,
      //          },
      //       });
      //    } else {
      //       throw new Error("Qualcosa è andato storto");
      //    }
      // } catch (error) {
      //    alert(error);
      // }
   };

   return (
      <div className="my-3">
         <Form onSubmit={sendComment}>
            <Form.Group className="mb-2">
               <Form.Label>Recensione</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Inserisci qui il testo"
                  value={state.comment.comment}
                  onChange={(e) =>
                     setState({
                        comment: {
                           ...state.comment,
                           comment: e.target.value,
                        },
                     })
                  }
               />
            </Form.Group>
            <Form.Group className="mb-2">
               <Form.Label>Valutazione</Form.Label>
               <Form.Control
                  as="select"
                  value={state.comment.rate}
                  onChange={(e) =>
                     setState({
                        comment: {
                           ...state.comment,
                           rate: parseInt(e.target.value),
                        },
                     })
                  }
               >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
               </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
               Invia
            </Button>
         </Form>
      </div>
   );
};

export default AddComment;

// class AddComment extends Component {
//    state = {
//       comment: {
//          comment: "",
//          rate: 1,
//          elementId: this.props.asin,
//       },
//    };

//    componentDidUpdate(prevProps) {
//       if (prevProps.asin !== this.props.asin) {
//          this.setState({
//             comment: {
//                ...this.state.comment,
//                elementId: this.props.asin,
//             },
//          });
//       }
//    }

//    sendComment = async (e) => {
//       e.preventDefault();
//       try {
//          let response = await fetch(
//             "https://striveschool-api.herokuapp.com/api/comments",
//             {
//                method: "POST",
//                body: JSON.stringify(this.state.comment),
//                headers: {
//                   "Content-type": "application/json",
//                   Authorization:
//                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzVkYWY2ZTNkZDAwMTQ5NWU0OWQiLCJpYXQiOjE2OTgzMzAwNzQsImV4cCI6MTY5OTUzOTY3NH0.tYZsMhhS_yqnCH1v4ULCoAeBdA9DXGK1tTakH4XmpPM",
//                },
//             }
//          );
//          if (response.ok) {
//             alert("Recensione inviata!");
//             this.setState({
//                comment: {
//                   comment: "",
//                   rate: 1,
//                   elementId: this.props.asin,
//                },
//             });
//          } else {
//             throw new Error("Qualcosa è andato storto");
//          }
//       } catch (error) {
//          alert(error);
//       }
//    };

//    render() {
//       return (
//          <div className="my-3">
//             <Form onSubmit={this.sendComment}>
//                <Form.Group className="mb-2">
//                   <Form.Label>Recensione</Form.Label>
//                   <Form.Control
//                      type="text"
//                      placeholder="Inserisci qui il testo"
//                      value={this.state.comment.comment}
//                      onChange={(e) =>
//                         this.setState({
//                            comment: {
//                               ...this.state.comment,
//                               comment: e.target.value,
//                            },
//                         })
//                      }
//                   />
//                </Form.Group>
//                <Form.Group className="mb-2">
//                   <Form.Label>Valutazione</Form.Label>
//                   <Form.Control
//                      as="select"
//                      value={this.state.comment.rate}
//                      onChange={(e) =>
//                         this.setState({
//                            comment: {
//                               ...this.state.comment,
//                               rate: parseInt(e.target.value),
//                            },
//                         })
//                      }
//                   >
//                      <option>1</option>
//                      <option>2</option>
//                      <option>3</option>
//                      <option>4</option>
//                      <option>5</option>
//                   </Form.Control>
//                </Form.Group>
//                <Button variant="primary" type="submit">
//                   Invia
//                </Button>
//             </Form>
//          </div>
//       );
//    }
// }

// export default AddComment;
