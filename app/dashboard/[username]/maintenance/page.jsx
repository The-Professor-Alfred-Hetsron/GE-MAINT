"use client"

import { useState, useCallback, useEffect } from "react";
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'clsx';
// import FormGroup from '@mui/material/FormGroup';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Typography from '@mui/material/FormControl';

import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    AllDayPanel,
    Appointments,
    AppointmentForm,
    EditRecurrenceMenu,
    AppointmentTooltip,
    CurrentTimeIndicator,
    Toolbar,
    Resources,
    ViewSwitcher,
    DateNavigator,
    MonthView,
    DayView,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { 
    maintenanceList,
    taskNatureList
} from '@/data/maintenancePage'

export default function Maintenance () {

    // const editingOptionsList = [
    //   { id: 'allowAdding', text: 'Adding' },
    //   { id: 'allowDeleting', text: 'Deleting' },
    //   { id: 'allowUpdating', text: 'Updating' },
    //   { id: 'allowResizing', text: 'Resizing' },
    // ];
    const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    const resources = [
      {
        fieldName: 'objetDeTache',
        title: 'Objet de la Tache',
        instances: taskNatureList,
      }
    ]
    const PREFIX = 'Demo';
    const classes = {
      icon: `${PREFIX}-icon`,
      textCenter: `${PREFIX}-textCenter`,
      equipImage: `${PREFIX}-equipImage`,
      subSysImage: `${PREFIX}-subSysImage`,
      panneImage: `${PREFIX}-panneImage`,
      header: `${PREFIX}-header`,
      commandButton: `${PREFIX}-commandButton`,
      container: `${PREFIX}-container`,
      text: `${PREFIX}-text`,
      formControlLabel: `${PREFIX}-formControlLabel`,
      line: `${PREFIX}-line`,
      circle: `${PREFIX}-circle`,
      nowIndicator: `${PREFIX}-nowIndicator`,
      shadedCell: `${PREFIX}-shadedCell`,
      shadedPart: `${PREFIX}-shadedPart`,
      appointment: `${PREFIX}-appointment`,
      shadedAppointment: `${PREFIX}-shadedAppointment`,
    };
    
    const [data, setData] = useState([])
    const [currentViewName, setCurrentViewName] = useState('work-week')
    const [currentDate, setCurrentDate] = useState(actualDate?actualDate:'2018-06-27')
    const [addedAppointment, setAddedAppointment] = useState({});
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);
    const [editingOptions, setEditingOptions] = useState({
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
      allowResizing: true,
    });
    const {
      allowDeleting, allowUpdating
    } = editingOptions;
    
    const commitChanges = async ({ added, changed, deleted }) => {
      let tempData = [...data]
      if (added) {
        console.log(added)
        try{
            const response = await fetch('/api/taches/ajouter', {
              method: 'POST',
              body: JSON.stringify(added)
            })
            const startingAddedId = tempData.length > 0 ? tempData[tempData.length - 1].id + 1 : 0;
            tempData = [...tempData, { id: startingAddedId, ...added }];
        }catch(error){
          console.log(error)
        }
      }
      if (changed) {
        console.log(changed)
        try{
            const keys = Object.keys(changed)
            const tacheId = Number.parseInt(keys[0])
            const response1 = await fetch('/api/taches/'+tacheId)
            const json1 = await response1.json()
            const tempTacheData = json1.tache
            
            if (!tempTacheData) return;
            let tempTache={...tempTacheData}
            tempTache = {...tempTache, ...changed[tacheId]}

            const response2 = await fetch(`/api/taches/editer/${tempUser.id}`, {
              method: 'PATCH',
              body: JSON.stringify(tempTache)
            })
            const json2 = await response2.json()
            const updatedTache = json2.tache

            tempData = tempData.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...updatedTache } : appointment));
        } catch(error){
          console.log(error)
        }
      }
      if (deleted !== undefined) {
        console.log(deleted)
        try{
            const response = await fetch(`/api/taches/supprimer/${deleted}`, {
                method: 'DELETE',
                body: JSON.stringify({})
            })
            const json = await response.json()
            const { message } = json
            console.log(message)
            if(!message) {
              return
            }
            tempData = tempData.filter(appointment => appointment.id !== deleted);
        }catch(error){
          console.log(error)
        }
      }
      setData(tempData)
    }

    const onAddedAppointmentChange = useCallback((appointment) => {
      setAddedAppointment(appointment);
      setIsAppointmentBeingCreated(true);
    },[setAddedAppointment, setIsAppointmentBeingCreated]);

    const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({
      theme, currentTimeIndicatorPosition,
    }) => ({
      [`&.${classes.shadedCell}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
        },
        '&:focus': {
          backgroundColor: alpha(theme.palette.primary.main, 0.20),
          outline: 0,
        },
      },
      [`& .${classes.shadedPart}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        position: 'absolute',
        height: currentTimeIndicatorPosition,
        width: '100%',
        left: 0,
        top: 0,
        'td:focus &': {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
        },
      },
    }));

    // #FOLD_BLOCK
    const TimeTableCell = ({
      currentTimeIndicatorPosition, isShaded, ...restProps
      // #FOLD_BLOCK
    }) => {
      const isNow = !!currentTimeIndicatorPosition;
      return (
        <StyledWeekViewTimeTableCell
          isShaded={isShaded && !isNow}
          currentTimeIndicatorPosition={currentTimeIndicatorPosition}
          className={classNames({
            [classes.shadedCell]: isShaded && !isNow,
          })}
          {...restProps}
        >
          {isNow && isShaded && (
            <div className={classes.shadedPart} />
          )}
        </StyledWeekViewTimeTableCell>
      );
    };

    const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
      [`&.${classes.equipImage}`]: {
          background: 'url(/assets/img/dashboard/maintenance/equipImage.svg)',
      },
      [`&.${classes.subSysImage}`]: {
          background: 'url(/assets/img/dashboard/maintenance/subSysImage.svg)',
      },
      [`&.${classes.panneImage}`]: {
          background: 'url(/assets/img/dashboard/maintenance/panneImage.svg)',
      },
      [`&.${classes.header}`]: {
          height: '260px',
          backgroundSize: 'cover',
      },
    }));

    const StyledGrid = styled(Grid)(() => ({
      [`&.${classes.textCenter}`]: {
          textAlign: 'center',
      },
      }));
  
    const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
      [`&.${classes.icon}`]: {
          color: palette.action.active,
      },
    }));

    const StyledAppointmentTooltipCommandButton = styled(AppointmentTooltip.CommandButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
    }));

    const getClassByLocation = (element) => {
      if (element === 'Equipement') return classes.equipImage;
      if (element === 'Sous système') return classes.subSysImage;
      return classes.panneImage;
    };


    const Header = (({
      children, appointmentData, ...restProps
    }) => (
      <StyledAppointmentTooltipHeader
        {...restProps}
        className={classNames(getClassByLocation(appointmentData?.element), classes.header)}
        appointmentData={appointmentData}
      >
      </StyledAppointmentTooltipHeader>
  ));

  const Content = (({
    children, appointmentData, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <StyledGrid item xs={2} className={classes.textCenter}>
          <StyledRoom className={classes.icon} />
        </StyledGrid>
        <Grid item xs={10}>
          <span>{appointmentData?.element}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));

  const CommandButton = (({
    ...restProps
  }) => (
    <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
  ));

  const FormCommandButton = useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);

  const StyledDiv = styled('div', {
    shouldForwardProp: prop => prop !== 'top',
  })(({ theme, top }) => ({
      [`&.${classes.container}`]: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
      },
      [`& .${classes.text}`]: theme.typography.h6,
      [`& .${classes.formControlLabel}`]: {
        ...theme.typography.caption,
        fontSize: '1rem',
      },
      [`& .${classes.line}`]: {
        height: '2px',
        borderTop: `4px ${"#EDA92A"} solid`,
        width: '100%',
        transform: 'translate(0, -1px)',
      },
      [`& .${classes.circle}`]: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#EDA92A",
      },
      [`& .${classes.nowIndicator}`]: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top,
      },
    }));

  const TimeIndicator = ({
    top, ...restProps
    // #FOLD_BLOCK
  }) => (
    <StyledDiv top={top} {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </StyledDiv>
  );

  useEffect(() => {
    const loadTaches = async () => {
        const response = await fetch('/api/taches')
        const json = await response.json()
        const { taches } = json
        if (!taches) return;
        console.log(taches)
        setData(taches);
    }
    loadTaches()
}, [])

    return(
        <div className="w-full h-full sticky bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            {/* <EditingOptionsSelector
                options={editingOptions}
                onOptionsChange={handleEditingOptionsChange}
            /> */}
            <span className="w-full text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Calendrier de Maintenance</span>
            <Paper className="h-full border border-slate-300">
              <Scheduler
                data={data}
                height="auto"
              >
                <ViewState
                  defaultCurrentDate={currentDate}
                  onCurrentDateChange={setCurrentDate}
                  currentViewName={currentViewName}
                  onCurrentViewNameChange={setCurrentViewName}
              />
                <EditingState
                  onCommitChanges={commitChanges}
                  addedAppointment={addedAppointment}
                  onAddedAppointmentChange={onAddedAppointmentChange}
                />
                <EditRecurrenceMenu />

                <MonthView
                  displayName="Mois"
                />

                <WeekView
                    name="work-week"
                    displayName="Jour de Travail"
                    timeTableCellComponent={TimeTableCell}
                    excludedDays={[0, 6]}
                    startDayHour={7}
                    endDayHour={16}
                />
                
                <DayView
                  displayName="Toute la Journée"
                  startDayHour={7}
                  endDayHour={16}
                />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AllDayPanel />
                <AppointmentTooltip
                  headerComponent={Header}
                  contentComponent={Content}
                  commandButtonComponent={CommandButton}
                  showCloseButton={true}
                  showOpenButton
                />
                <AppointmentForm 
                  commandButtonComponent={FormCommandButton}
                  readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                />

                <Resources
                  data={resources}
                  mainResourceName="objetDeTache"
                />
                <CurrentTimeIndicator
                  indicatorComponent={TimeIndicator}
                  shadePreviousCells = {true}
                  shadePreviousAppointments = {true}
              />
              </Scheduler>
            </Paper>

        </div>
    )
}