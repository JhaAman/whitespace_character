import './App.css';
import React from 'react';
import Recog from './Recognition';

function App() {
  return (
    <div className = 'App'>
      <h1>Recognitions and Such</h1>
      <Recog name = "Kenny G" message = "Keeping it saxy."/>
      <Recog name = "Black Betty" message = "Whoa, Black Betty (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
Black Betty had a child (Bam-ba-lam)
The damn thing gone wild (Bam-ba-lam)
She said, I'm worryin' outta mind (Bam-ba-lam)
The damn thing gone blind (Bam-ba-lam)
I said oh, Black Betty (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
She really gets me high (Bam-ba-lam)
You know that's no lie (Bam-ba-lam)
She's so rock steady (Bam-ba-lam)
And she's always ready (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
Whoa, Black Betty (Bam-ba-lam)
Get it!"/> 
      <Recog name = "Robot Rock" message = "Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock.
      Robot rock. Robot rock. Robot rock.Robot rock. Robot rock. Robot rock.Robot rock. Robot rock. Robot rock.Robot rock. Robot rock. Robot rock. 
      Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. Robot rock. 
      Robot rock. Robot rock. Robot rock. Robot rock."/>

      <Recog name = "Mississippi Queen" message = "If you know what I mean."/>
    </div>
  );
}

export default App;