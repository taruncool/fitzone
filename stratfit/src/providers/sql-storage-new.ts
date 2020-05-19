import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class SqlStorageNew {

  storage: any;
  DB_NAME: string = '__stratfitNew';
  database;

  constructor(public platform: Platform, public sqlite: SQLite) {
    this.platform.ready().then(() => {
        console.log("I am in new db");
      this.sqlite.create({ name: this.DB_NAME, location: 'default'/*, iosDatabaseLocation: 'Library'*/ })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.tryInit();
        });
    });
  }

  createDB() {
    this.sqlite.create({ name: this.DB_NAME, location: 'default'/*, iosDatabaseLocation: 'Library'*/ })
    .then((db: SQLiteObject) => {
      this.storage = db;
      this.tryInit();
    });
  }

  openDB() {
    this.database = new SQLite();
    this.database.openDatabase({
        name: this.DB_NAME,
        location: "default"
    }).then(() => {
        return true;
    }, (error) => {
        console.error("Unable to open database", error);
        setTimeout(() => {
          this.openDB
        },4000);
    });
  }

  tryInit() {

    this.query('DROP TABLE IF EXISTS _plan_temp');
    this.query('CREATE TABLE IF NOT EXISTS `plan` (`id` INTEGER NOT NULL PRIMARY KEY, `planName` TEXT NOT NULL, `planDescription` BLOB, `planStatus` INTEGER NOT NULL, `price` REAL DEFAULT NULL, `ability` TEXT DEFAULT NULL, `num_of_periods` INTEGER NOT NULL, `num_of_sessions` INTEGER NOT NULL, `goals` TEXT DEFAULT NULL, `duration_weeks` INTEGER DEFAULT NULL, `planPhoto` TEXT DEFAULT NULL, `programType_id` INTEGER NOT NULL, `genWarmupVideo` TEXT DEFAULT NULL, `cooldownVideo` TEXT DEFAULT NULL, `createdBy` TEXT NOT NULL, `createdByImg` TEXT DEFAULT NULL,`totalsubscribers` INTEGER DEFAULT NULL)')
      .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
      });
    this.query('pragma table_info(plan)').then(data=>{
      if(data.res.rows.item(4).type==='INTEGER'){
        console.log('INSIDE PRAGMA');
        this.query('ALTER TABLE plan RENAME to _plan_temp').then(data=>{
          this.query('DROP TABLE IF EXISTS plan').then(data=>{
            this.query('CREATE TABLE `plan` (`id` INTEGER NOT NULL PRIMARY KEY, `planName` TEXT NOT NULL, `planDescription` BLOB, `planStatus` INTEGER NOT NULL, `price` REAL DEFAULT NULL, `ability` TEXT DEFAULT NULL, `num_of_periods` INTEGER NOT NULL, `num_of_sessions` INTEGER NOT NULL, `goals` TEXT DEFAULT NULL, `duration_weeks` INTEGER DEFAULT NULL, `planPhoto` TEXT DEFAULT NULL, `programType_id` INTEGER NOT NULL, `genWarmupVideo` TEXT DEFAULT NULL, `cooldownVideo` TEXT DEFAULT NULL, `createdBy` TEXT NOT NULL, `createdByImg` TEXT DEFAULT NULL,`totalsubscribers` INTEGER DEFAULT NULL)').then(data1 => {
              console.log('insert queries');
              this.query('INSERT INTO plan (`id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`, `createdBy`, `createdByImg`,`totalsubscribers`) SELECT `id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`, `createdBy`, `createdByImg`,`totalsubscribers` FROM _plan_temp').then(data2 => {
                this.query('DROP TABLE IF EXISTS _plan_temp');
              });
            });
          });
        });
      }
    }).catch(err => {
        console.error('Checking userplan table columns', err.tx, err.err);
    });
    // this.query('CREATE TABLE IF NOT EXISTS `plan` (`id` INTEGER NOT NULL PRIMARY KEY, `planName` TEXT NOT NULL, `planDescription` BLOB, `planStatus` INTEGER NOT NULL, `price` REAL DEFAULT NULL, `num_of_periods` INTEGER NOT NULL, `planPhoto` TEXT DEFAULT NULL, `thumb_img` TEXT DEFAULT NULL, `num_of_microcycles` INTEGER NOT NULL,`activation_status` INTEGER NOT NULL,`publish_date` DATETIME DEFAULT NULL)')
    // this.query('CREATE TABLE IF NOT EXISTS `plan` (`id` INTEGER NOT NULL PRIMARY KEY, `planName` TEXT NOT NULL, `planDescription` BLOB, `planStatus` INTEGER NOT NULL, `price` REAL DEFAULT NULL, `ability` TEXT DEFAULT NULL, `num_of_periods` INTEGER NOT NULL, `num_of_sessions` INTEGER NOT NULL, `goals` TEXT DEFAULT NULL, `duration_weeks` INTEGER DEFAULT NULL, `planPhoto` TEXT DEFAULT NULL, `programType_id` INTEGER NOT NULL, `genWarmupVideo` TEXT DEFAULT NULL, `cooldownVideo` TEXT DEFAULT NULL, `createdBy` TEXT NOT NULL, `createdByImg` TEXT DEFAULT NULL,`totalsubscribers` INTEGER DEFAULT NULL)')
    // .catch(err => {
    //   console.error('Unable to create initial storage tables plan', err.tx, err.err);
    // }); 
    this.query('CREATE TABLE IF NOT EXISTS `planlevel`(`id` INTEGER NOT NULL PRIMARY KEY,`plan_id` INTEGER NOT NULL,`training_level_id` INTEGER NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `planpurpose`(`id` INTEGER NOT NULL PRIMARY KEY,`plan_id` INTEGER NOT NULL,`purpose_id` INTEGER NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    // this.query('CREATE TABLE IF NOT EXISTS `Plan_Period`(`plan_id` INTEGER NOT NULL,`period_name` TEXT NOT NULL,`status` INTEGER NOT NULL,`description`  BLOB,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,` num_of_mesocycles` INTEGER NOT NULL,`num_of_microcycles` INTEGER NOT NULL, )')

    this.query('CREATE TABLE IF NOT EXISTS `planperiod` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`period_id` INTEGER NOT NULL, `periodName` TEXT DEFAULT NULL, `num_of_mesocycles` INTEGER NOT NULL, `duration_weeks` INTEGER DEFAULT NULL, `plan_id` INTEGER NOT NULL, `status` INTEGER NOT NULL, `perioddate` DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `planmesocycle`(`id` INTEGER NOT NULL PRIMARY KEY,`meso_id` INTEGER NOT NULL,`plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`mesocycles_name` TEXT NOT NULL,`description`  BLOB,`num_of_microcycles` INTEGER NOT NULL,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `planmicrocycles`(`id` INTEGER NOT NULL PRIMARY KEY,`micro_id` INTEGER NOT NULL,`plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_name` TEXT NOT NULL,`description` BLOB,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL,`num_of_days` INTEGER NOT NULL,`total_load` REAL NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `plandays`(`id` INTEGER NOT NULL PRIMARY KEY,`day_id` INTEGER NOT NULL, `plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_id` INTEGER NOT NULL,`day_name` TEXT NOT NULL,`description`  BLOB,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL,`num_of_sessions` INTEGER NOT NULL,`total_load` REAL NOT NULL,`rest_time` TEXT NOT NULL,`date` DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `plansessions`(`id` INTEGER NOT NULL PRIMARY KEY,`session_id` INTEGER NOT NULL,`plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_id` INTEGER NOT NULL,`day_id` INTEGER NOT NULL,`session_name` TEXT NOT NULL,`description`  BLOB,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL,`num_of_exercises` INTEGER NOT NULL,`total_load` REAL NOT NULL,`rest_time` TEXT NOT NULL,`date` DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `planactivity`(`id` INTEGER NOT NULL PRIMARY KEY,`activity_id` INTEGER NOT NULL,`plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_id` INTEGER NOT NULL,`day_id` INTEGER NOT NULL,`session_id` INTEGER NOT NULL,`Activity_name` TEXT NOT NULL,`Activity_type` TEXT NOT NULL,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL,`total_load` REAL NOT NULL,`rest_time` TEXT NOT NULL,`description`  BLOB,`warm_up` INTEGER NOT NULL,`date` DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    this.query('CREATE TABLE IF NOT EXISTS `planround`(`id` INTEGER NOT NULL PRIMARY KEY,`plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_id` INTEGER NOT NULL,`day_id` INTEGER NOT NULL,`session_id` INTEGER NOT NULL,`activity_id` INTEGER NOT NULL,`round_id` INTEGER NOT NULL,`round_name` TEXT NOT NULL,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`status` INTEGER NOT NULL,`total_load` REAL NOT NULL,`rest_time` TEXT NOT NULL,`description`  BLOB,`round_type` TEXT NOT NULL,`num_of_actions` INTEGER NOT NULL,`date` DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS planactions');
    this.query('CREATE TABLE IF NOT EXISTS `planactions`(`id` INTEGER NOT NULL PRIMARY KEY,`action_id` INTEGER NOT NULL, `plan_id` INTEGER NOT NULL,`period_id` INTEGER NOT NULL,`meso_id` INTEGER NOT NULL,`micro_id` INTEGER NOT NULL,`day_id` INTEGER NOT NULL,`session_id` INTEGER NOT NULL,`activity_id` INTEGER NOT NULL,`round_id` INTEGER NOT NULL,`exercise_id` INTEGER NOT NULL,`pdc_id` INTEGER NOT NULL,`parent_id` INTEGER NOT NULL,`action_type` TEXT NOT NULL,`intensity_range` REAL NOT NULL,`num_of_sets` INTEGER NOT NULL,`min_reps` INTEGER NOT NULL,`max_reps` INTEGER NOT NULL,`prescribed_reps` INTEGER NOT NULL,`all_out` INTEGER NOT NULL,`intensity` INTEGER NOT NULL,`instruction` TEXT NOT NULL,`rest_time` TEXT NOT NULL,`calculated_ability` TEXT NOT NULL,`intensity_level` TEXT NOT NULL,`extra_ability` TEXT NOT NULL,`hypertrophy_potency` REAL NOT NULL,`lactate_generate_potency` REAL NOT NULL,`strength_speed_potency` REAL NOT NULL,`strength_potency_zone` TEXT NOT NULL,`strength_endurance_potency` REAL NOT NULL,`date` DATETIME DEFAULT NULL,`workweight` INTEGER DEFAULT NULL, `repsdone` INTEGER DEFAULT NULL,`status` INTEGER DEFAULT NULL,`tmax` INTEGER DEFAULT NULL,`more_reps` INTEGER DEFAULT NULL, `updatestatus` INTEGER DEFAULT 0)')
    .catch(err => {
        console.error('Unable to create initial storage tables plan', err.tx, err.err);
    });
    // this.query('DROP TABLE IF EXISTS exercises');
    this.query('CREATE TABLE IF NOT EXISTS `exercises` (`id` INTEGER NOT NULL PRIMARY KEY, `exerciseName` TEXT NOT NULL, `exerciseStatus` INTEGER NOT NULL, `exerciseDesc` BLOB, `videos` TEXT DEFAULT NULL, stressFactor REAL DEFAULT 0, exCoefficient REAL DEFAULT 0, exIcon TEXT NOT NULL, exGroup TEXT NOT NULL, exMainGroup TEXT NOT NULL, flowType TEXT NOT NULL, preExInstruction BLOB NOT NULL, postExInstruction BLOB NOT NULL, accessLevel INTEGER NOT NULL, weightExists INTEGER NOT NULL, distanceExists INTEGER NOT NULL, timeExists INTEGER NOT NULL, repsExists INTEGER NOT NULL, setInstruction INTEGER NOT NULL, speedExists INTEGER NOT NULL, `tmax` INTEGER DEFAULT 0, `updatetmax` INTEGER DEFAULT 0,`ExerciseCoverImage` TEXT DEFAULT NULL,`ExerciseThumbImage` TEXT DEFAULT NULL,`ExerciseVideo` TEXT DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables exercises', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS plateweights');
    this.query('CREATE TABLE IF NOT EXISTS `plateweights` (`id` INTEGER NOT NULL PRIMARY KEY, `weight` INTEGER NOT NULL, `count` INTEGER DEFAULT NULL, `barbell` INTEGER NOT NULL, `status` INTEGER NOT NULL, `index` INTEGER NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables plateweights', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS userplan');
    this.query('CREATE TABLE IF NOT EXISTS `userplan` (`id` INTEGER NOT NULL PRIMARY KEY, `startdate` DATETIME DEFAULT NULL,`nextrenewaldate` DATETIME DEFAULT NULL, `plan_id` INTEGER NOT NULL, `user_id` INTEGER NOT NULL, `status` INTEGER NOT NULL, `dayOff` INTEGER DEFAULT 0 , `seasonDate`  DATETIME DEFAULT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables userplan', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS genwarmup');
    this.query('CREATE TABLE IF NOT EXISTS `genwarmup` (`id` INTEGER NOT NULL PRIMARY KEY, `direction` TEXT NOT NULL, `equipment` TEXT NOT NULL, `extime` TEXT NULL, `name` TEXT NOT NULL, `reps` INTEGER DEFAULT 0)')
    .catch(err => {
        console.error('Unable to create initial storage tables exercises', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS exwarmup');
    this.query('CREATE TABLE IF NOT EXISTS `exwarmup` (`id` INTEGER NOT NULL PRIMARY KEY, `exercisetype` TEXT NOT NULL, `reps` INTEGER NOT NULL, `sets` INTEGER NOT NULL, `intensity` INTEGER NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables exercises', err.tx, err.err);
    });
    //this.query('DROP TABLE IF EXISTS cooldown');
    this.query('CREATE TABLE IF NOT EXISTS `cooldown` (`id` INTEGER NOT NULL PRIMARY KEY, `name` TEXT NOT NULL)')
    .catch(err => {
        console.error('Unable to create initial storage tables exercises', err.tx, err.err);
    });
  }



 /**
   * Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.
   *
   * @param {string} query the query to run
   * @param {array} params the additional params to use for query placeholders
   * @return {Promise} that resolves or rejects with an object of the form 
   * { tx: Transaction, res: Result (or err)}
   */
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.transaction((tx: any) => {
          tx.executeSql(query, params,
            (tx: any, res: any) => resolve({ tx: tx, res: res }),
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }

  /** GET the value in the database identified by the given key. */
  get(id: number): Promise<any> {
    return this.query('select id, desc from planInfo where id = ? limit 1', [id])
      .then(data => {
        if (data.res.rows.length > 0) {
          return data.res.rows.item(0).desc;
        }
      });
  }

  /** SET the value in the database for the given key. */
  set(id: string, desc: string): Promise<any> {
    return this.query('insert into planInfo(id, desc) values (?, ?)', [id, desc]);
  }

  /** REMOVE the value in the database for the given key. */
  remove(id: string): Promise<any> {
    return this.query('delete from planInfo where id = ?', [id]);
  }

}
