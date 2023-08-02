import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import moment from 'moment';
import {
  blue, amber, purple, deepOrange, green,
} from '@mui/material/colors';

const appointments:AppointmentModel[] = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    objetDeTache: 1,
    element: 'Equipement',
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
  }, {
    id: 1,
    title: 'Oil Painting for Beginners',
    objetDeTache: 2,
    element: 'Sous système',
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
  }, {
    id: 2,
    title: 'Testing',
    objetDeTache: 3,
    element: 'Panne',
    startDate: new Date(2017, 4, 1, 12, 0),
    endDate: new Date(2017, 4, 1, 13, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=MO;WKST=TU;INTERVAL=2;COUNT=2',
  }, {
    id: 3,
    title: 'Meeting of Instructors',
    objetDeTache: 1,
    element: 'Equipement',
    startDate: new Date(2017, 4, 1, 9, 0),
    endDate: new Date(2017, 4, 1, 9, 15),
    rRule: 'FREQ=DAILY;BYDAY=WE;UNTIL=20170601',
  }, {
    id: 4,
    title: 'Recruiting students',
    objetDeTache: 3,
    element: 'Panne',
    startDate: new Date(2017, 4, 26, 10, 0),
    endDate: new Date(2017, 4, 26, 11, 0),
    rRule: 'FREQ=YEARLY;BYWEEKNO=23',
    exDate: '20170611T100000',
  }, {
    id: 5,
    title: 'Final exams',
    objetDeTache: 2,
    element: 'Sous système',
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
    rRule: 'FREQ=YEARLY;BYWEEKNO=24;BYDAY=TH,FR',
  }, {
    id: 6,
    title: 'Monthly Planning',
    objetDeTache: 1,
    element: 'Equipement',
    startDate: new Date(2017, 4, 26, 14, 30),
    endDate: new Date(2017, 4, 26, 15, 45),
    rRule: 'FREQ=MONTHLY;BYMONTHDAY=27;COUNT=1',
  }, {
    id: 7,
    title: 'Open Day',
    objetDeTache: 2,
    element: 'Sous système',
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 13),
    rRule: 'FREQ=YEARLY;BYYEARDAY=148',
  },
]

// const appointments:AppointmentModel[] = [
//     {
//       title: 'Website Re-Design Plan',
//       startDate: new Date(2018, 5, 25, 9, 35),
//       endDate: new Date(2018, 5, 25, 11, 30),
//       objetDeTache:2,
//       id: 0,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Book Flights to San Fran for Sales Trip',
//       startDate: new Date(2018, 5, 25, 12, 11),
//       endDate: new Date(2018, 5, 25, 13, 0),
//       id: 1,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Install New Router in Dev Room',
//       startDate: new Date(2018, 5, 25, 14, 30),
//       endDate: new Date(2018, 5, 25, 15, 35),
//       id: 2,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Approve Personal Computer Upgrade Plan',
//       startDate: new Date(2018, 5, 26, 10, 0),
//       endDate: new Date(2018, 5, 26, 11, 0),
//       id: 3,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Final Budget Review',
//       startDate: new Date(2018, 5, 26, 12, 0),
//       endDate: new Date(2018, 5, 26, 13, 35),
//       id: 4,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'New Brochures',
//       startDate: new Date(2018, 5, 26, 14, 30),
//       endDate: new Date(2018, 5, 26, 15, 45),
//       id: 5,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Install New Database',
//       startDate: new Date(2018, 5, 27, 9, 45),
//       endDate: new Date(2018, 5, 27, 11, 15),
//       id: 6,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Approve New Online Marketing Strategy',
//       startDate: new Date(2018, 5, 27, 12, 0),
//       endDate: new Date(2018, 5, 27, 14, 0),
//       id: 7,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Upgrade Personal Computers',
//       startDate: new Date(2018, 5, 27, 15, 15),
//       endDate: new Date(2018, 5, 27, 16, 30),
//       id: 8,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Customer Workshop',
//       startDate: new Date(2018, 5, 28, 11, 0),
//       endDate: new Date(2018, 5, 28, 12, 0),
//       id: 9,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Prepare 2015 Marketing Plan',
//       startDate: new Date(2018, 5, 28, 11, 0),
//       endDate: new Date(2018, 5, 28, 13, 30),
//       id: 10,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Brochure Design Review',
//       startDate: new Date(2018, 5, 28, 14, 0),
//       endDate: new Date(2018, 5, 28, 15, 30),
//       id: 11,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Create Icons for Website',
//       startDate: new Date(2018, 5, 29, 10, 0),
//       endDate: new Date(2018, 5, 29, 11, 30),
//       id: 12,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Upgrade Server Hardware',
//       startDate: new Date(2018, 5, 29, 14, 30),
//       endDate: new Date(2018, 5, 29, 16, 0),
//       objetDeTache:2,
//       id: 13,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Submit New Website Design',
//       startDate: new Date(2018, 5, 29, 16, 30),
//       endDate: new Date(2018, 5, 29, 18, 0),
//       id: 14,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Launch New Website',
//       startDate: new Date(2018, 5, 29, 12, 20),
//       endDate: new Date(2018, 5, 29, 14, 0),
//       id: 15,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Website Re-Design Plan',
//       startDate: new Date(2018, 6, 2, 9, 30),
//       endDate: new Date(2018, 6, 2, 15, 30),
//       id: 16,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Book Flights to San Fran for Sales Trip',
//       startDate: new Date(2018, 6, 2, 12, 0),
//       endDate: new Date(2018, 6, 2, 13, 0),
//       id: 17,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Install New Router in Dev Room',
//       startDate: new Date(2018, 6, 2, 14, 30),
//       endDate: new Date(2018, 6, 2, 17, 30),
//       id: 18,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Approve Personal Computer Upgrade Plan',
//       startDate: new Date(2018, 6, 2, 16, 0),
//       endDate: new Date(2018, 6, 3, 9, 0),
//       id: 19,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Final Budget Review',
//       startDate: new Date(2018, 6, 3, 10, 15),
//       endDate: new Date(2018, 6, 3, 13, 35),
//       id: 20,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'New Brochures',
//       startDate: new Date(2018, 6, 3, 14, 30),
//       endDate: new Date(2018, 6, 3, 15, 45),
//       id: 21,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Install New Database',
//       startDate: new Date(2018, 6, 3, 15, 45),
//       endDate: new Date(2018, 6, 4, 12, 15),
//       id: 22,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Approve New Online Marketing Strategy',
//       startDate: new Date(2018, 6, 4, 12, 35),
//       endDate: new Date(2018, 6, 4, 14, 15),
//       id: 23,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Upgrade Personal Computers',
//       startDate: new Date(2018, 6, 4, 15, 15),
//       endDate: new Date(2018, 6, 4, 20, 30),
//       id: 24,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Customer Workshop',
//       startDate: new Date(2018, 6, 5, 6, 0),
//       endDate: new Date(2018, 6, 5, 14, 20),
//       id: 25,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Customer Workshop',
//       startDate: new Date(2018, 6, 5, 14, 35),
//       endDate: new Date(2018, 6, 5, 16, 20),
//       id: 26,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Customer Workshop 2',
//       startDate: new Date(2018, 6, 5, 10, 0),
//       endDate: new Date(2018, 6, 5, 11, 20),
//       id: 27,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Prepare 2015 Marketing Plan',
//       startDate: new Date(2018, 6, 5, 20, 0),
//       endDate: new Date(2018, 6, 6, 13, 30),
//       id: 28,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Brochure Design Review',
//       startDate: new Date(2018, 6, 6, 14, 10),
//       endDate: new Date(2018, 6, 6, 15, 30),
//       id: 29,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Create Icons for Website',
//       startDate: new Date(2018, 6, 6, 10, 0),
//       endDate: new Date(2018, 6, 7, 14, 30),
//       id: 30,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Upgrade Server Hardware',
//       startDate: new Date(2018, 6, 3, 9, 30),
//       endDate: new Date(2018, 6, 3, 12, 25),
//       id: 31,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Submit New Website Design',
//       startDate: new Date(2018, 6, 3, 12, 30),
//       endDate: new Date(2018, 6, 3, 18, 0),
//       id: 32,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Launch New Website',
//       startDate: new Date(2018, 6, 3, 12, 20),
//       endDate: new Date(2018, 6, 3, 14, 10),
//       id: 33,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Book Flights to San Fran for Sales Trip',
//       startDate: new Date(2018, 5, 26, 0, 0),
//       endDate: new Date(2018, 5, 27, 0, 0),
//       id: 34,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Customer Workshop',
//       startDate: new Date(2018, 5, 29, 10, 0),
//       endDate: new Date(2018, 5, 30, 14, 30),
//       id: 35,
//       element: 'Tache Sur Equipement',
//     }, {
//       title: 'Google AdWords Strategy',
//       startDate: new Date(2018, 6, 3, 0, 0),
//       endDate: new Date(2018, 6, 4, 10, 30),
//       id: 36,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Rollout of New Website and Marketing Brochures',
//       startDate: new Date(2018, 6, 5, 10, 0),
//       endDate: new Date(2018, 6, 9, 14, 30),
//       id: 37,
//       element: 'Tache Sur la Panne',
//     }, {
//       title: 'Update NDA Agreement',
//       startDate: new Date(2018, 6, 1, 10, 0),
//       endDate: new Date(2018, 6, 3, 14, 30),
//       id: 38,
//       element: 'Tache Sur Sous système',
//     }, {
//       title: 'Customer Workshop',
//       startDate: new Date(2018, 6, 1),
//       endDate: new Date(2018, 6, 2),
//       allDay: true,
//       id: 39,
//       element: 'Tache Sur Equipement',
//     },
//   ]

  
  const currentDate = moment();
  let date = currentDate.date();
  
  const makeTodayAppointment = (startDate:string, endDate:string) => {
    const days = moment(startDate).diff(endDate, 'days');
    const nextStartDate = moment(startDate)
      .year(currentDate.year())
      .month(currentDate.month())
      .date(date);
    const nextEndDate = moment(endDate)
      .year(currentDate.year())
      .month(currentDate.month())
      .date(date + days);
  
    return {
      startDate: nextStartDate.toDate(),
      endDate: nextEndDate.toDate(),
    };
  };
  
  export const maintenanceList =  appointments.map(({ startDate, endDate, ...restArgs }) => {
    const result = {
      ...makeTodayAppointment(startDate as string, endDate as string),
      ...restArgs,
    };
    date += 1;
    if (date > 31) date = 1;
    return result;
  });


  export const taskNatureList = [
    {
      text: 'Tache Sur un Equipement',
      id: 1,
      color: blue,
    },
    {
      text: 'Tache Sur un Sous Système',
      id: 2,
      color: amber,
    },
    {
      text: 'Tache sur une Panne',
      id: 3,
      color: deepOrange,
    }
  ]