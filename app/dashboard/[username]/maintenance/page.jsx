"use client"

import { useState, useCallback } from "react";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'clsx';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/FormControl';

import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    CurrentTimeIndicator,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    MonthView,
    DayView,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import { 
    maintenanceList
} from '@/data/maintenancePage'

export default function Maintenance () {

    const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    
    const [ data, setData ] = useState(maintenanceList)
    const [ currentViewName, setCurrentViewName ] = useState('work-week')
    const [ currentDate, setCurrentDate ] = useState(actualDate?actualDate:'2018-06-27')
    const [editingOptions, setEditingOptions] = useState({
      allowAdding: true,
      allowDeleting: true,
      allowUpdating: true,
      allowResizing: true,
    });
    const [addedAppointment, setAddedAppointment] = useState({});
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);
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
          borderTop: `2px ${theme.palette.primary.main} dotted`,
          width: '100%',
          transform: 'translate(0, -1px)',
        },
        [`& .${classes.circle}`]: {
          width: theme.spacing(1.5),
          height: theme.spacing(1.5),
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: theme.palette.primary.main,
        },
        [`& .${classes.nowIndicator}`]: {
          position: 'absolute',
          zIndex: 1,
          left: 0,
          top,
        },
      }));

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
    
    const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
      [`&.${classes.appointment}`]: {
        backgroundColor: "#4285F4",
        '&:hover': {
          backgroundColor: "#E8F2F8",
        },
      },
      [`&.${classes.shadedAppointment}`]: {
        backgroundColor: "#149FDA",
        '&:hover': {
          backgroundColor: "#0B5DA7",
        },
      },
    }));
    
    // #FOLD_BLOCK
    const TimeIndicator = ({
      top, ...restProps
      // #FOLD_BLOCK
    }) => (
      <StyledDiv top={top} {...restProps}>
        <div className={classNames(classes.nowIndicator, classes.circle)} />
        <div className={classNames(classes.nowIndicator, classes.line)} />
      </StyledDiv>
    );
    
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
    
    // #FOLD_BLOCK
    const Appointment = ({
      isShaded, ...restProps
      // #FOLD_BLOCK
    }) => (
      <StyledAppointmentsAppointment
        className={classNames({
          [classes.appointment]: true,
          [classes.shadedAppointment]: isShaded,
        })}
        {...restProps}
      />
    );

    const editingOptionsList = [
      { id: 'allowAdding', text: 'Adding' },
      { id: 'allowDeleting', text: 'Deleting' },
      { id: 'allowUpdating', text: 'Updating' },
      { id: 'allowResizing', text: 'Resizing' },
    ];

    const EditingOptionsSelector = ({
      options, onOptionsChange,
    }) => (
      <StyledDiv className={classes.container}>
        <Typography className={classes.text}>
          Enabled Options
        </Typography>
        <FormGroup row>
          {editingOptionsList.map(({ id, text }) => {
                  ;
              return (
                  <FormControlLabel
              control={(
                <Checkbox
                  checked={options[id]}
                  onChange={onOptionsChange}
                  value={id}
                  color="primary"
                />
              )}
              classes={{ label: classes.formControlLabel }}
              label={text}
              key={id}
              disabled={(id === 'allowResizing') && !options.allowUpdating}
            />
              )
          })}
        </FormGroup>
      </StyledDiv>
    )

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

    const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
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
      if (element === 'Tache Sur Equipement') return classes.equipImage;
      if (element === 'Tache Sur Sous système') return classes.subSysImage;
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
          <StyledIconButton
            /* eslint-disable-next-line no-alert */
            onClick={() => alert(JSON.stringify(appointmentData))}
            className={classes.commandButton}
            size="large"
          >
            <MoreIcon />
          </StyledIconButton>
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
  
    const {
      allowAdding, allowDeleting, allowUpdating, allowResizing,
    } = editingOptions;
  
    const onCommitChanges = useCallback(({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId = data.length > 0 ? Number(data[data.length - 1]?.id) + 1 : 0;
        const tempData = {
            id: startingAddedId, ...added,
            startDate: ""
        }
        setData([...data, tempData]);
      }
      if (changed) {
          setData(data.map((appointment, index) => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
      }

      if (deleted !== undefined) {
        setData(data.filter(appointment => appointment?.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = useCallback((appointment) => {
      setAddedAppointment(appointment);
      setIsAppointmentBeingCreated(true);
    },[setAddedAppointment, setIsAppointmentBeingCreated]);
    
    const handleEditingOptionsChange = useCallback(({ target }) => {
      const { value } = target;
      const { [value]: checked } = editingOptions;
      setEditingOptions({
        ...editingOptions,
        [value]: !checked,
      });
    },[editingOptions, setEditingOptions]);

  
    const FormCommandButton = useCallback(({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }, [allowDeleting]);

    const allowResize = useCallback(
      () => allowResizing && allowUpdating,
      [allowResizing, allowUpdating],
    );

    return(
        <div className="w-full h-full sticky bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            {/* <EditingOptionsSelector
                options={editingOptions}
                onOptionsChange={handleEditingOptionsChange}
            /> */}
            <Paper className="h-full">
                <Scheduler
                    data={data}
                    height="auto"
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={setCurrentDate}
                        currentViewName={currentViewName}
                        onCurrentViewNameChange={setCurrentViewName}
                    />

                    <EditingState
                        onCommitChanges={onCommitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={onAddedAppointmentChange}
                    />

                    <IntegratedEditing />

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
                    />

                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments
                      appointmentComponent={Appointment}
                    />
                    <AppointmentTooltip
                        headerComponent={Header}
                        contentComponent={Content}
                        commandButtonComponent={CommandButton}
                        showCloseButton={true}
                        showDeleteButton={allowDeleting}
                    />
                    <AppointmentForm
                        commandButtonComponent={FormCommandButton}
                        readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                    />
                    <CurrentTimeIndicator
                      indicatorComponent={TimeIndicator}
                      shadePreviousCells
                      shadePreviousAppointments
                    />
                </Scheduler>
            </Paper>
        </div>
    )
}