import React, { useEffect } from 'react';
import styles from './EventCreateForm.module.css';
import { Link } from 'react-router-dom';
import categories from '../../api/categories';
import departamentos from '../../api/departamentos';
import mapa from '../../assets/imgs/mapa2.png'
import iconEditar from '../../assets/imgs/iconEditar.svg'
import iconExclamacion2 from '../../assets/imgs/iconExclamacion2.svg'
import calendar from '../../assets/imgs/calendar.svg'
import basquet from '../../assets/imgs/basquet.svg'
import infoIcon from '../../assets/imgs/infoIcon.svg'
import { Calendar } from 'react-date-range';



const EventCreateForm = () => {
   
console.log(categories)

 return (
    <div className={styles.container}>
    <div className={styles.containerForm}>
      <form>
      {/* Seccion 1 */}

       <div>
        <p className={styles.title}>Nombre del Evento</p>
        <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.
        </p>
        <input className={styles.input} type='text' placeholder='Nombre del evento'/>
        <p className={styles.subInput}>Máximo 10 palabras</p>
       </div>

       {/* Seccion 2 */}

       <div>
        <p className={styles.title}>Escoge hasta 3 categorías</p>
        <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
        <div className={styles.containerChecks}>
        {
            categories.map (categorie =>
                <div className={styles.checks}>
                    <label className={styles.labelsChecks}>
                    <input
                    className={styles.checkBox}
                    type='checkbox'/>{categorie.name}
                    </label>
              </div>
            )
        }
        </div>
        <label className={styles.subTitle}>Si escogiste ‘otro’, especifica :
         <input className={styles.input2} type='text'/>
        </label>
        
       </div>

       {/* Seccion 3 */}
       <div>

        <div className={styles.containerDescription}>
            <p className={styles.title}>Descripción breve</p>
            <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
            <input className={styles.input3} type='text' placeholder='descripción breve del evento'/>
            <p className={styles.subTitle}>Máximo xx de caracteres</p>
        </div>
        <div className={styles.containerDescription}>
            <p className={styles.title}>Descripción detallada</p>
            <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
            <input className={styles.input3} type='text' placeholder='descripción detallada del evento'/>
            <p className={styles.subTitle}>Minimo 75 palabras</p>
        </div>
       </div>

      {/* Seccion 4 */}

      <div className={styles.container4}>
        <p  className={styles.title}>Agrega fotos y/o videos</p>
        <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
        <p className={styles.subTitle4}>Fotos del Evento</p>
        <input className={styles.inputPicture} type='text' placeholder='Arrastra los archivos aquí o haz clic en Agregar archivos'/>
        <label className={styles.subInput}>
            <input className={styles.checkBox4} type='checkbox'/>
            Quiero que esta sea la portada</label>
       </div>

       {/* Seccion 5 */}

       <div className={styles.container5}>
        <p className={styles.title}>Donde es el Evento?</p>
        <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
        <div className={styles.containerEnlinea}>
            <label className={styles.subTitle}>
                <input className={styles.checkBox4} type='checkbox'/>
                Este es un evento en linea
            </label>
        
            <input className={styles.input2} type='text' placeholder='Colocar el enlace del evento'/>
        </div>

        <div className={styles.containerSelects}>

            <select className={styles.select}  defaultValue='default'>
            <option value='default' disabled>Departamento</option>
            {departamentos &&
                departamentos.map((departamento) => (
                <option key={departamento} value={departamento}>
                    {departamento}
                </option>
                ))}
            </select>

            <select className={styles.select}  defaultValue='default'>
            <option value='default' disabled>Municipio</option>
            {departamentos &&
                departamentos.map((departamento) => (
                <option key={departamento} value={departamento}>
                    {departamento}
                </option>
                ))}
            </select>
        
        </div>

        

        <input className={styles.input5} type='text' placeholder='Dirección del evento'/>
        <input className={styles.input5} type='text' placeholder='Nombre del Lugar/Barrio'/>

         <div  className={styles.containerMap}>
            <p  className={styles.titleMap}>Ubicación en el mapa</p>
            <img src={mapa} alt="imagen_mapa" />
            <p className={styles.subtextMap}>Texto google legal aqui</p>
            
            {/* <img  className={styles.icon} src={iconEditar} alt='n' /> */}
            <button className={styles.btn}>
                 <img  className={styles.icon} src={iconEditar} alt='n' />
           </button>
        </div>

        <p className={styles.subtextEspecial}>Accesibilidad y requerimientos especiales</p>
        <div className={styles.especialDiv}>
            <span><img  className={styles.iconExclamacion2} src={iconExclamacion2} alt='n' /></span>
            <span><p className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p></span>
        </div>
       </div>

       {/* Seccion 6 */}

       <div className={styles.container6}>
        
        <div>
            <p className={styles.title}>Costo y fecha</p>
            <p className={styles.subTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolaore te feugait nulla facilisi.</p>
            
            <div className={styles.containerInfo}>

             <div className={styles.containerSubInfo}>
                <label className={styles.subInfoTitle}>Máximo número de participantes
                <input className={styles.subInfoInput} type='txt' placeholder='10'/>
                </label>
             </div>

             <div className={styles.containerSubInfo}>
                <label className={styles.subInfoTitle}>Precio por cupo
                    <p>$</p>
                <input className={styles.subInfoInput} type='txt' placeholder='20.00'/>
                </label>
                <p>$21.990</p>
                <p className={styles.subInfotxt}>Precio al público incluyendo costo de manejo e IVA</p>
             </div>

             <div className={styles.containerSubInfo}>
                <label className={styles.subInfoTitle}>Tu ganas por cupo
                <p>$</p>
                <input className={styles.subInfoInput} type='txt' placeholder='20.00'/>
                </label>
                <p className={styles.subInfotxt}>Después de nuestra comisión + IVA</p>
                <button className={styles.btn6}>Ver Más</button>
             </div>

             <div className={styles.containerSubInfo}>

                <label className={styles.subInfoTitle}>Tu ganas por evento
                <div className={styles.labelS}>
                <p>$</p>
                <input className={styles.subInfoInput} type='txt' placeholder='160.901'/>
                </div>
                </label>
                <p className={styles.subInfotxt}>Esto sería lo que ganarías si se venden todos tus cupos</p>
             </div>

            </div> 
        </div>

        <hr  className={styles.hr}></hr>

            <div className={styles.containerDateInfo}>

                <div className={styles.subcon}>
                    <label  className={styles.label6}>Fecha </label>
                    <div className={styles.contCalendar}>
                    <input type='date' />
                    <img className={styles.calendar} src={calendar} alt='n' />
                    </div>
                </div>

                <div className={styles.subcon}>
                    <label className={styles.label6}>Comienza</label>
                    <input type='time'/>
                    
                </div>

                <div className={styles.subcon}>
                    <label className={styles.label6}>Termina</label>
                    <input type='time' />
                    
                </div>

                <img className={styles.basquet} src={basquet} alt='n' />

            </div>

            <div  className={styles.containerBono}>
                <div>

                <label className={styles.subTitle} >
                    <input className={styles.checkDescuento} type='checkbox'/>
                    Brindar códigos de descuento 
                </label>
                <img className={styles.infoIcon} src={infoIcon} alt='n' />
                </div>
                <div>
                <button className={styles.btnbono}>Mostrar</button>
                <button className={styles.btnbono}>Ocultar</button>
                </div>
            </div>

            

          <hr  className={styles.hr}></hr>

          <div>
            <button className={styles.newdate}> + Crer Nueva Fecha</button>
          </div>

         
          
          <div>
            <p className={styles.acceptText}>Al hacer clic en ‘Publicar’ confirma que ha leído y entendido nuestros Términos y Condiciones, Notas legales de privacidad y Seguridad.</p>
            
            <div className={styles.btnContainer}>
            <button className={styles.viewBtn}>Vista Previa</button>

            <button className={styles.submitBtn}  type='submit'> Publicar Evento</button>

            <button className={styles.submitBtn}  type='submit'>Guardar y Publiar Luego</button>
            </div>
            <p>Debes llenar todos los campos para poder continuar.</p>

            <button className={styles.cancelBtn}  type='submit'>Cancelar</button>

          </div>

        </div>


      </form>
      </div>
    </div>
 )
}

export default EventCreateForm;




