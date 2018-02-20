//
//  Printer.m
//  retailrapp
//
//  Created by Nam on 2/11/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Printer.h"
#import "React/RCTLog.h"
#import <AVFoundation/AVFoundation.h>

#define KEY_RESULT                  @"Result"
#define KEY_METHOD                  @"Method"
#define PAGE_AREA_HEIGHT    500
#define PAGE_AREA_WIDTH     500
#define FONT_A_HEIGHT       24
#define FONT_A_WIDTH        12
#define BARCODE_HEIGHT_POS  70
#define BARCODE_WIDTH_POS   110


@implementation Printer

// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();

// We must explicitly expose methods otherwise JavaScript can't access anything
RCT_REMAP_METHOD(get,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  //float volume = [AVAudioSession sharedInstance].outputVolume;
  //NSString* volumeString = [NSString stringWithFormat:@"%f", volume];
  
  //if (volumeString) {
  //  resolve(volumeString);
  //} else {
  //  reject(@"get_error", @"Error getting system volume", nil);
  //}
  
  //  Epos2Printer *printer = nil;
  //  printer = [[Epos2Printer alloc] initWithPrinterSeries:EPOS2_TM_T82 lang:EPOS2_MODEL_ANK];
  //  if (printer == nil) {
  //    //Displays error messages
  //    resolve(@"error");
  //  }
  //
  //  //resolve(@"success");
  //  int result = EPOS2_SUCCESS;
  //  result = [printer addTextAlign:EPOS2_ALIGN_CENTER]; result = [printer addText:@"Hello World"];
  //  if (result != EPOS2_SUCCESS) {
  //    //Displays error messages
  //    resolve(@"error");
  //  }
  //  //resolve(@"success");
  //
  //  int result1 = EPOS2_SUCCESS;
  //  result1 = [printer connect:@"TCP:192:168.192.168", timeout:EPOS2_PARAM_DEFAULT];
  //  result1 = [printer beginTransaction];
  //  if (result1 != EPOS2_SUCCESS) {
  //    //Displays error messages
  //    //resolve(@"error");
  //  }
  //  //resolve(@"success");
  //
  //  Epos2PrinterStatusInfo *status = nil;
  //  status = [printer getStatus];
  //  if (status.getConnection && status.getOnline) {
  //    result = [printer sendData:EPOS2_PARAM_DEFAULT];
  //  }else{
  //    //Displays error messages
  //    //Abort process
  //  }
  
  
  if (![self runPrintReceiptSequence]) {
    resolve(@"error");
  } else {
    resolve(@"success");
  }
}


- (BOOL)runPrintReceiptSequence
{
  if (![self initializeObject]) {
    return NO;
  }
  
  if (![self createReceiptData]) {
    [self finalizeObject];
    return NO;
  }
  
  if (![self printData]) {
    [self finalizeObject];
    return NO;
  }
  
  return YES;
}

- (BOOL)initializeObject
{
  printer_ = [[Epos2Printer alloc] initWithPrinterSeries:EPOS2_TM_T82 lang:EPOS2_MODEL_ANK];
  
  if (printer_ == nil) {
    return NO;
  }
  
  [printer_ setReceiveEventDelegate:self];
  
  return YES;
}

- (void)finalizeObject
{
  if (printer_ == nil) {
    return;
  }
  
  [printer_ clearCommandBuffer];
  
  [printer_ setReceiveEventDelegate:nil];
  
  printer_ = nil;
}

-(BOOL)connectPrinter
{
  int result = EPOS2_SUCCESS;
  
  if (printer_ == nil) {
    return NO;
  }
  
  result = [printer_ connect:@"TCP:F8:D0:27:2B:0F:93" timeout:EPOS2_PARAM_DEFAULT];
  if (result != EPOS2_SUCCESS) {
    return NO;
  }
  
  result = [printer_ beginTransaction];
  if (result != EPOS2_SUCCESS) {
    [printer_ disconnect];
    return NO;
  }
  
  return YES;
}

- (void)disconnectPrinter
{
  int result = EPOS2_SUCCESS;
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
  
  if (printer_ == nil) {
    return;
  }
  
  result = [printer_ endTransaction];
  if (result != EPOS2_SUCCESS) {
    [dict setObject:[NSNumber numberWithInt:result] forKey:KEY_RESULT];
    [dict setObject:@"endTransaction" forKey:KEY_METHOD];
    [self performSelectorOnMainThread:@selector(showEposErrorFromThread:) withObject:dict waitUntilDone:NO];
  }
  
  result = [printer_ disconnect];
  if (result != EPOS2_SUCCESS) {
    [dict setObject:[NSNumber numberWithInt:result] forKey:KEY_RESULT];
    [dict setObject:@"disconnect" forKey:KEY_METHOD];
    [self performSelectorOnMainThread:@selector(showEposErrorFromThread:) withObject:dict waitUntilDone:NO];
  }
  [self finalizeObject];
}

- (BOOL)createReceiptData
{
    int result = EPOS2_SUCCESS;
  
    const int barcodeWidth = 2;
    const int barcodeHeight = 100;
  
    if (printer_ == nil) {
      return NO;
    }
  
    NSMutableString *textData = [[NSMutableString alloc] init];
//    UIImage *logoData = [UIImage imageNamed:@"store.png"];
//
//    if (textData == nil || logoData == nil) {
//      return NO;
//    }
  
    result = [printer_ addTextAlign:EPOS2_ALIGN_CENTER];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
//    result = [printer_ addImage:logoData x:0 y:0
//                          width:logoData.size.width
//                         height:logoData.size.height
//                          color:EPOS2_COLOR_1
//                           mode:EPOS2_MODE_MONO
//                       halftone:EPOS2_HALFTONE_DITHER
//                     brightness:EPOS2_PARAM_DEFAULT
//                       compress:EPOS2_COMPRESS_AUTO];
//
//    if (result != EPOS2_SUCCESS) {
//      return NO;
//    }
  
    // Section 1 : Store infomation
    result = [printer_ addFeedLine:1];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData appendString:@"THE STORE 123 (555) 555 – 5555\n"];
    [textData appendString:@"STORE DIRECTOR – John Smith\n"];
    [textData appendString:@"\n"];
    [textData appendString:@"7/01/07 16:58 6153 05 0191 134\n"];
    [textData appendString:@"ST# 21 OP# 001 TE# 01 TR# 747\n"];
    [textData appendString:@"------------------------------\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];
  
    // Section 2 : Purchaced items
    [textData appendString:@"400 OHEIDA 3PK SPRINGF  9.99 R\n"];
    [textData appendString:@"410 3 CUP BLK TEAPOT    9.99 R\n"];
    [textData appendString:@"445 EMERIL GRIDDLE/PAN 17.99 R\n"];
    [textData appendString:@"438 CANDYMAKER ASSORT   4.99 R\n"];
    [textData appendString:@"474 TRIPOD              8.99 R\n"];
    [textData appendString:@"433 BLK LOGO PRNTED ZO  7.99 R\n"];
    [textData appendString:@"458 AQUA MICROTERRY SC  6.99 R\n"];
    [textData appendString:@"493 30L BLK FF DRESS   16.99 R\n"];
    [textData appendString:@"407 LEVITATING DESKTOP  7.99 R\n"];
    [textData appendString:@"441 **Blue Overprint P  2.99 R\n"];
    [textData appendString:@"476 REPOSE 4PCPM CHOC   5.49 R\n"];
    [textData appendString:@"461 WESTGATE BLACK 25  59.99 R\n"];
    [textData appendString:@"------------------------------\n"];
  
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];
  
    // Section 3 : Payment infomation
    [textData appendString:@"SUBTOTAL                160.38\n"];
    [textData appendString:@"TAX                      14.43\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];
  
    result = [printer_ addTextSize:2 height:2];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    result = [printer_ addText:@"TOTAL    174.81\n"];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    result = [printer_ addTextSize:1 height:1];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    result = [printer_ addFeedLine:1];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    [textData appendString:@"CASH                    200.00\n"];
    [textData appendString:@"CHANGE                   25.19\n"];
    [textData appendString:@"------------------------------\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];
  
    // Section 4 : Advertisement
    [textData appendString:@"Purchased item total number\n"];
    [textData appendString:@"Sign Up and Save !\n"];
    [textData appendString:@"With Preferred Saving Card\n"];
    result = [printer_ addText:textData];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
    [textData setString:@""];
  
    result = [printer_ addFeedLine:2];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }

//    result = [printer_ addBarcode:@"01209457"
//                             type:EPOS2_BARCODE_CODE39
//                              hri:EPOS2_HRI_BELOW
//                             font:EPOS2_FONT_A
//                            width:barcodeWidth
//                           height:barcodeHeight];
//    if (result != EPOS2_SUCCESS) {
//      return NO;
//    }
  
    result = [printer_ addCut:EPOS2_CUT_FEED];
    if (result != EPOS2_SUCCESS) {
      return NO;
    }
  
    return YES;
}

- (BOOL)printData
{
  int result = EPOS2_SUCCESS;
  
    Epos2PrinterStatusInfo *status = nil;
  
  if (printer_ == nil) {
    return NO;
  }
  
  if (![self connectPrinter]) {
    return NO;
  }
  
  status = [printer_ getStatus];

  if (![self isPrintable:status]) {
    [printer_ disconnect];
    return NO;
  }

  result = [printer_ sendData:EPOS2_PARAM_DEFAULT];
  if (result != EPOS2_SUCCESS) {
    [printer_ disconnect];
    return NO;
  }
  
  return YES;
}

- (BOOL)isPrintable:(Epos2PrinterStatusInfo *)status
{
  if (status == nil) {
    return NO;
  }
  
  if (status.connection == EPOS2_FALSE) {
    return NO;
  }
  else if (status.online == EPOS2_FALSE) {
    return NO;
  }
  else {
    ;//print available
  }
  
  return YES;
}

@end
