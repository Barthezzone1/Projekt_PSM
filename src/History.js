import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs  } from './firebase';

const History = () => {
  const [documentData, setDocumentData] = useState(null);

//   useEffect(() => {
//     // Retrieve the document from Firestore
//     db.collection('myCollection').doc(documentId).get()
//       .then((doc) => {
//         if (doc.exists) {
//           // Set the document data in the state variable
//           setDocumentData(doc.data());
//         } else {
//           console.log('No such document!');
//         }
//       })
//       .catch((error) => {
//         console.log('Error getting document:', error);
//       });
//   }, [documentId]);

  return (
    <>
      {documentData && (
        <div>
          <h1>{documentData.title}</h1>
          <p>{documentData.description}</p>
          <p>{documentData.author}</p>
        </div>
      )}
    </>
  );
};

export default History;
