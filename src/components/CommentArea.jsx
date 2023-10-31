import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
   // state = {
   //    comments: [],
   //    isLoading: false,
   //    isError: false,
   // };

   const [state, setState] = useState({
      comments: [],
      isLoading: false,
      isError: false,
   });

   console.log("comment area: ", props.asin);

   useEffect(() => {
      if (props.asin) {
         LoadComments();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.asin]);

   const LoadComments = async () => {
      // setState({ ...state, isLoading: true });
      try {
         let response = await fetch(
            "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
            {
               headers: {
                  Authorization:
                     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzVkYWY2ZTNkZDAwMTQ5NWU0OWQiLCJpYXQiOjE2OTgzMzAwNzQsImV4cCI6MTY5OTUzOTY3NH0.tYZsMhhS_yqnCH1v4ULCoAeBdA9DXGK1tTakH4XmpPM",
               },
            }
         );
         console.log(response);
         if (response.ok) {
            let comments = await response.json();
            setState({
               comments: comments,
               isLoading: false,
               isError: false,
            });
         } else {
            console.log("error");
            setState({ isLoading: false, isError: true });
         }
      } catch (error) {
         console.log(error);
         setState({ isLoading: false, isError: true });
      }
   };

   // componentDidUpdate = async (prevProps) => {
   //    if (prevProps.asin !== this.props.asin) {
   //       this.setState({
   //          isLoading: true,
   //       });
   //       try {
   //          let response = await fetch(
   //             "https://striveschool-api.herokuapp.com/api/comments/" +
   //                this.props.asin,
   //             {
   //                headers: {
   //                   Authorization:
   //                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNzVkYWY2ZTNkZDAwMTQ5NWU0OWQiLCJpYXQiOjE2OTgzMzAwNzQsImV4cCI6MTY5OTUzOTY3NH0.tYZsMhhS_yqnCH1v4ULCoAeBdA9DXGK1tTakH4XmpPM",
   //                },
   //             }
   //          );
   //          console.log(response);
   //          if (response.ok) {
   //             let comments = await response.json();
   //             this.setState({
   //                comments: comments,
   //                isLoading: false,
   //                isError: false,
   //             });
   //          } else {
   //             this.setState({ isLoading: false, isError: true });
   //          }
   //       } catch (error) {
   //          console.log(error);
   //          this.setState({ isLoading: false, isError: true });
   //       }
   //    }
   // };

   return (
      <div className="text-center">
         {state.isLoading && <Loading />}
         {state.isError && <Error />}
         <AddComment asin={props.asin} />
         <CommentList commentsToShow={state.comments} />
      </div>
   );
};

export default CommentArea;
