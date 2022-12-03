import {useState } from 'react'
import './App.css'
import SignatureCanvas from 'react-signature-canvas'
import { useRef } from 'react'

function App() {

  const [openModel, setOpenModal] = useState(false)
  const sigCanvas = useRef()
  const [penColor, setPenColor] = useState('black')
  const [imageURL, setImageURL] = useState(null)

  const colors = ['black', 'green', 'red']

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    setImageURL(URL)
    setOpenModal(false)
  }

  const download = () => {
    const dlink = document.createElement("a")
    dlink.setAttribute("href", imageURL)
    dlink.setAttribute("download", "signature.png")
    dlink.click()
  }

  return (
    <div className='app'>
      <button onClick={() => setOpenModal(true)}>Create Signature</button>
      <br />
      {imageURL &&  
        <>  
          <img
            src={imageURL}
            alt='signature'
            className='signature'
          />
          <br />
          <button 
            onClick={download}
            style={{padding: '5px', marginTop: '5px'}}
          >Download</button>
        </>
      }
      {openModel &&
        <div className='modalContainer'>
          <div className='modal'>
            <div className='sigPad__penColors'>
              <p>Pen Color:</p>
              {colors.map((color) => (  
                <span 
                  key={color}
                  style={{
                    backgroundColor: color, 
                    border: `${color===penColor ? `2px solid ${color}` : '' }`}} 
                    onClick={() => setPenColor(color)}>                    
                </span>                                           
              ))}
            </div>
            <div className='sigPadContainer'>
              <SignatureCanvas penColor={penColor}
                canvasProps={{className: 'sigCanvas'}}
                ref={sigCanvas} />
              <hr/>
              <button onClick={() => sigCanvas.current.clear()}>Clear</button>
            </div>
            
            <div className='modal__bottom'>
              <button onClick={() => setOpenModal(false)}>Cancel</button>
              <button 
                className='create'  
                onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App