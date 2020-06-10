import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { StatisticAuthorDropdownList } from '../components/StatisticAuthorDropdownList';
import { StatisticTableList } from '../components/StatisticTableList';

import { Loader } from '../components/Loader';
import { NotFoundPage } from '../components/NotFoundPage';

export const PollTable = () => {
    const { token } = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [assessments, setAssessments] = useState(null);
    const [poll, setPoll] = useState(null);
    const [author, setAuthor] = useState(null);
    const [selected, setSelected] = useState(null);
    const pollId = useParams().id;

    const getPoll = useCallback( async () => {
        try {
           const fetched =  await request(`/api/poll/${pollId}`, 'GET', null, { Authorization: `Bearer ${token}` });
           setPoll(fetched);
        } catch(err) {
            console.log(err)
        }
    }, [token, pollId, request]);

    useEffect(() => {
        getPoll()
    }, [getPoll]);


    const getAssessment = useCallback( async () => {
        try {
            const fetched =  await request(`/api/poll/getassessment/${pollId}`, 'GET', null, { Authorization: `Bearer ${token}` });
            setAssessments(fetched);
        } catch(err) {
            console.log(err)
        }
    }, [token, pollId, request]);
    
    useEffect(() => {
        getAssessment()
    }, [getAssessment]);


    const selectedAssessment = useCallback(() => {
        if(!assessments || !author || author === 'default') {
            return;
        }

        const selectedAssessmentsArr = [];
        assessments.forEach((assessment) => {
            if(author === assessment.projectAuthor) {
                selectedAssessmentsArr.push(assessment);
            }
        });

        setSelected(selectedAssessmentsArr);
    }, [author, assessments]);

    useEffect(() => {
        selectedAssessment()
    }, [selectedAssessment]);


    if(loading) {
        return <Loader />
    }

    return (
        (!loading && poll && poll !== 404)
        ?
            <div>
                <br/>
                <h5>Список авторов: </h5>
                <StatisticAuthorDropdownList authors={ poll.projectAuthors } setAuthor={ setAuthor }/>
                <br/>
                { author && author !== 'default' && selected
                ?
                    <StatisticTableList cards={ poll.cards } assessments={ selected } author={ author }/>
                :
                <h2><i className="large material-icons" style={{display:"block", color:"green"}}>arrow_upward</i>Выберите автора для отображения таблицы его результатов.</h2>
                }
            </div>
        :
            poll === 404 ? <NotFoundPage /> : <div></div>
    )
}