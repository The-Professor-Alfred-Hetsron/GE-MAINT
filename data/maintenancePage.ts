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


// const appointments:AppointmentModel[] = []

  
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
  
  export const maintenanceList =  appointments?.map(({ startDate, endDate, ...restArgs }) => {
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