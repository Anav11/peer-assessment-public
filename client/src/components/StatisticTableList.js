import React from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const StatisticTableList = ({ author, cards, assessments }) => {

    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for(let i = 0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    const saveClick = () => {
        let wb = XLSX.utils.table_to_book(document.getElementById('mytable'), {sheet:"Sheet JS"});
        let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST:true, type:'binary'});
    
        saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), `${author}.xlsx`);
    }

    let overallAverageRating = 0;
    let sumOfWeights = 0;

    return (
    <div>
        <div className="btn-large" onClick={saveClick}><i className="material-icons left">cloud</i>Сохранить в xlsx</div>
        
        <table className="striped" id="mytable" style={{position:"absolute", left:"0", margin:"2% 0"}}>
            <thead style={{borderBottom:"1px solid"}}>
                <tr>
                    <th style={{width:"25%", textAlign:"center"}}>Критерии</th>
                    <th style={{width:"5%", borderRight:"1px solid", borderLeft:"1px solid", textAlign:"center"}}>Вес</th>
                    {
                        assessments.map((assessment, index) => {
                            return (
                                <th key={index} style={{textAlign:"center"}}>
                                <p className="statistic-table__expert-name">
                                    {assessment.expert}
                                </p>
                                </th>
                            )
                        })
                    }
                    <th style={{width:"10%", borderLeft:"1px solid", textAlign:"center"}}>Средняя</th>
                </tr>
            </thead>
            <tbody>
                {
                    cards.map((card, cardIndex) => {
                        let averageRating = 0;
                        sumOfWeights += card.importance;

                        return (
                            <tr key={cardIndex}>
                                <td style={{width:"300px"}}>{ card.criterionName }</td>
                                <td style={{textAlign:"center", borderRight:"1px solid", borderLeft:"1px solid"}}>{ card.importance }</td>
                                {
                                    assessments.map((assessment, index) => {
                                        return (
                                            <td key={index} style={{textAlign:"center"}}>
                                                {assessment.marks[cardIndex]}
                                            </td>
                                        )
                                    })
                                }
                                {
                                    assessments.map((assessment, index) => {
                                        averageRating += Number(assessment.marks[cardIndex]);
                                        if(index+1 === assessments.length) {
                                            averageRating = Number((averageRating / assessments.length).toFixed(2));
                                            overallAverageRating += averageRating * card.importance;
                                            return (
                                                <td key={index} style={{textAlign:"center", borderLeft:"1px solid"}}>
                                                    {averageRating}
                                                </td>
                                            )
                                        }

                                        return undefined;
                                    })
                                }
                            </tr>
                        )
                    })
                }
                <tr>
                    <td style={{borderTop:"2px solid"}}><b>Общая оценка</b></td>
                    <td style={{borderTop:"2px solid"}}></td>
                    <td style={{borderTop:"2px solid"}}></td>
                    {
                        assessments.map((card, cardIndex) => {
                            if(assessments.length === cardIndex+1) {
                                let overallRating = Number((overallAverageRating / (sumOfWeights * 3 / 5)).toFixed(2));
                                return (
                                    <td style={{textAlign:"center", borderLeft:"1px solid", borderTop:"2px solid"}} key={cardIndex}>
                                        <b>{isNaN(overallRating) ? 0 : overallRating}</b>
                                    </td>
                                )
                            } else {
                                return (
                                    <td style={{borderTop:"2px solid"}} key={cardIndex}></td>
                                )
                            }
                        })
                    }
                </tr>
            </tbody>
        </table>
    </div>
    )
}
