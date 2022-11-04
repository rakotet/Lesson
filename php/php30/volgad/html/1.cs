private void НаПодписаниеЭП_ItemClick(System.Object sender, DevExpress.XtraBars.ItemClickEventArgs e)
        {
        ICustomizableControl customizable = CardControl;
            Guid OldReconciliation = Guid.Empty;
            RowData ReconciliationRow = null;

            MessageResult result = CardControl.ShowMessage("Отправить документ на подписание?", "Выбор", null, MessageType.Question, MessageButtons.YesNoCancel);
            switch (result)
            {
                case MessageResult.Yes:

                    Document document = (Document)BaseObject;
                    try
                    {
                        ReconciliationRow = CardControl.CardData.Sections[CardDocument.Reconciliation.ID].Rows[0];
                        OldReconciliation = (Guid)ReconciliationRow.GetGuid("Reconciliation");
                    }
                    catch
                    {
                    }
                    // ------------------- создание и запуск подписания
                    IServiceFactoryRegistry serviceFactoryRegistry = CardControl.ObjectContext.GetService<IServiceFactoryRegistry>();

                    serviceFactoryRegistry.RegisterFactory(typeof(ApprovalDesignerServiceFactory));

                    var mapperFactoryRegistry = CardControl.ObjectContext.GetService<IObjectMapperFactoryRegistry>();

                    mapperFactoryRegistry.RegisterFactory(typeof(ApprovalDesignerMapperFactory));

                    Guid initialCardId = CardControl.ObjectContext.GetObjectRef(BaseObject).Id;
                    KindsCardKind cardKind = CardControl.ObjectContext.GetObject<KindsCardKind>(new Guid("9C0E5586-41B8-411E-B5CD-C94B605CB7A1"));

                    KindsCardCreationSetting cardCreationSetting = cardKind.CreationSettings.FirstOrDefault(t => t.ModeName.Equals("Подписание исходящего документа УКЭП"));
                    Guid reconciliationId = CardControl.ObjectContext.GetService<IReconcileService>().CreateReconciliationCard(initialCardId, cardCreationSetting);
                    CardData reconciliationCardData = Session.CardManager.GetCardData(reconciliationId);
                    reconciliationCardData.Description = document.Description;
                    CardControl.ObjectContext.GetService<IReconcileService>().HandleDocumentAfterReconcileCreated((Document)BaseObject, reconciliationCardData);
                    //		MessageBox.Show("2");		
                    // ------------------- создание и запуск согласования

                    MessageBox.Show("Задание на подписание документа создано.");

                    IStateService stateService = CardControl.ObjectContext.GetService<IStateService>();
                    StatesState endState = stateService.GetStates(document.SystemInfo.CardKind).First(t => t.DefaultName.Equals("Is signinP"));
                   if (OldReconciliation != Guid.Empty)
					ReconciliationRow.SetGuid("Reconciliation", (Guid)OldReconciliation); 
				
					CardControl.ObjectContext.AcceptChanges();
        			CardControl.ObjectContext.SaveObject(document);
					CardFrame.Close();
                    break;

                case MessageResult.No:
                    break;
                default: break;
            }
        }