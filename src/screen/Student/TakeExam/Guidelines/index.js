import React from 'react';
import Icon from '../../../../components/Icon';
import { SectionContent } from '../../../../components/Section';
import {
  BASIC_INSTRUCTIONS,
  EXAM_RULES_REGULATIONS
} from '../../../../constants';
import { addSuffix } from '../../../../helper';
import styles from '../takeexam.module.css';

const Guidelines = ({ subjCode, sem = 1, updateIndex }) => {
  return (
    <>
      <SectionContent className={styles.subjDetails}>
        <h1>
          Subject Code: {subjCode}, {addSuffix(sem)} Sem
        </h1>
      </SectionContent>
      <SectionContent className={styles.rulesAndRegulations}>
        <h3>
          Guidelines and instructions for the Candidates for Online Examination
        </h3>
        <ul>
          {EXAM_RULES_REGULATIONS.map((rule) => (
            <li>{rule}</li>
          ))}
        </ul>
      </SectionContent>
      <SectionContent className={styles.guidelines}>
        <h3>Basic Instructions for Online Examinations:</h3>
        <ol type="A">
          {BASIC_INSTRUCTIONS.map((item) => {
            return (
              <>
                <li className={styles.subheading}>{item.heading}</li>
                <ol type="1">
                  {item.instructions.map((instr) => (
                    <li>{instr}</li>
                  ))}
                </ol>
              </>
            );
          })}
        </ol>
        <div onClick={() => updateIndex(2)} className={styles.proceed}>
          <p>I have read the instructions and I am ready to start the exam</p>
          <Icon name="fas fa-step-forward fa-sm" />
        </div>
      </SectionContent>
    </>
  );
};

export default Guidelines;
