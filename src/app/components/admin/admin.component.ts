::ng-deep .mat-grid-tile-content {
  justify-content: flex-start !important ;

  .font-size {
    display: flex;
     justify-content: flex-end;
     font-size: 12px;
     padding-left: 2%;
  }

  .icon-position{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 16px;
  }

  .telechargement-position{
    display: flex;
    justify-content: center;
    width: 100%;
  }


}



.admin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  .big-error {
    margin-bottom: 2.2rem;
  }
  .admin-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: flex-start;
    .admin-card-header {
      width: 100%;
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      -webkit-align-self: flex-start;
      display: -webkit-flex;
      -webkit-flex-direction: column;
      border-bottom: 1px solid var(--ft-asset);
      .mat-card-title {
        font-size: 16px;
      }
    }
    .admin-card-content {
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      display: -webkit-flex;
      -webkit-flex-direction: column;
      &-error {
        color: var(--ft-error);
      }
      &-infos {
        font-size: 14px;
        &-recipients {
          display: flex;
          flex-direction: column;
          padding: 0 16px;
        }
        ::ng-deep .mat-list-item-content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          display: -webkit-flex;
          -webkit-flex-direction: row;
          -webkit-justify-content: space-between;

          .mat-icon {
            cursor: pointer;
            margin-left: auto;
          }
        }
        .delete {
          .mat-icon:hover {
            color: var(--ft-error);
          }
        }
        .addDestinataire {
          padding: 0 16px;
          .addForm {
            min-width: 150px;
            max-width: 500px;
            width: 100%;
          }
          .full-width {
            width: 100%;
          }
        }
      }
      &-files {
        border-top: solid 1px var(--ft-mention);
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        .file-item {
          width: 100%;
        }
      }

      .subheader {
        color: var(--ft-mention);
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .respientHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-right: 16px;
      }
    }
    .admin-card-actions-btn {
      background-color: var(--ft-blue-france);
      color: var(--ft-white);
    }
  }
  .deleted {
    color: var(--ft-error);
    .recipient-mail {
      text-decoration: line-through;
    }
  }
  .list-elem {
    max-width: 60%;
    display: flex;
    flex-grow: 1;
  }

  .down-count {
    //margin-left: auto;
    margin-left: 20%;
  }


}

::ng-deep .mat-snack-bar-container {
  padding: 0px !important;
  background-color: #ffffff;
  color: #0a0a0a;
  border-color: #40a02b;
  border-style: solid;
}

@media screen and (min-width: 812px) {
  .admin-wrapper {
    .admin-card {
      // height: 100vh;
      // width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      height: 60%;
      width: 70%;
    }
  }

}

@media screen and (min-width: 480px) and (max-width: 812px) {
  .admin-wrapper {
    .admin-card {
      margin-top: 90px;
      height: 60%;
      width: 80%;
    }
  }
}

@media screen and (min-width: 200px) and (max-width: 480px) {
  .admin-wrapper {
    .admin-card {
      margin-top: 90px;
      height: 100%;
      width: 100%;
    }
  }
}
