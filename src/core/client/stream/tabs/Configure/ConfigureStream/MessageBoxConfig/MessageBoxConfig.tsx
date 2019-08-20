import { Localized } from "fluent-react/compat";
import React, { FunctionComponent, Suspense } from "react";
import { Field } from "react-final-form";

import { MarkdownEditor } from "coral-framework/components/loadables";
import {
  formatEmpty,
  parseBool,
  parseEmptyAsNull,
  ValidationMessage,
} from "coral-framework/lib/form";
import {
  MessageBox,
  MessageBoxContent,
  MessageBoxIcon,
} from "coral-stream/common/MessageBox";
import {
  HorizontalGutter,
  Icon,
  Spinner,
  TileOption,
  TileSelector,
  Typography,
} from "coral-ui/components";

import ToggleConfig from "../ToggleConfig";
import WidthLimitedDescription from "../WidthLimitedDescription";

import styles from "./MessageBoxConfig.css";

interface Props {
  disabled: boolean;
}

const MessageBoxConfig: FunctionComponent<Props> = ({ disabled }) => (
  <Field name="messageBox.enabled" type="checkbox" parse={parseBool}>
    {({ input }) => (
      <ToggleConfig
        id={input.name}
        disabled={disabled}
        {...input}
        title={
          <Localized id="configure-messageBox-title">
            <span>Enable Message Box for this Stream</span>
          </Localized>
        }
      >
        <HorizontalGutter size="oneAndAHalf">
          <Localized id="configure-messageBox-description">
            <WidthLimitedDescription>
              Add a message to the top of the comment box for your readers. Use
              this to pose a topic, ask a question or make announcements
              relating to this story.
            </WidthLimitedDescription>
          </Localized>
          {input.checked && (
            <Field
              name="messageBox.icon"
              parse={parseEmptyAsNull}
              format={formatEmpty}
            >
              {({ input: iconInput }) => (
                <Field name="messageBox.content">
                  {({ input: contentInput, meta }) => (
                    <>
                      <HorizontalGutter size="half" container="section">
                        <Localized id="configure-messageBox-preview">
                          <Typography
                            variant="bodyCopyBold"
                            container="h1"
                            className={styles.preview}
                          >
                            PREVIEW
                          </Typography>
                        </Localized>
                        <MessageBox>
                          {iconInput.value && (
                            <MessageBoxIcon>{iconInput.value}</MessageBoxIcon>
                          )}
                          {/* Using a zero width join character to ensure that the space is used */}
                          <MessageBoxContent>
                            {contentInput.value || "&nbsp;"}
                          </MessageBoxContent>
                        </MessageBox>
                      </HorizontalGutter>
                      <HorizontalGutter size="half" container="fieldset">
                        <Localized id="configure-messageBox-selectAnIcon">
                          <Typography variant="bodyCopyBold" container="legend">
                            Select an Icon
                          </Typography>
                        </Localized>
                        <TileSelector
                          id="configure-messageBox-icon"
                          name={iconInput.name}
                          onChange={iconInput.onChange}
                          value={iconInput.value}
                        >
                          <TileOption value="question_answer">
                            <Icon size="md">question_answer</Icon>
                          </TileOption>
                          <TileOption value="today">
                            <Icon size="md">today</Icon>
                          </TileOption>
                          <TileOption value="help_outline">
                            <Icon size="md">help_outline</Icon>
                          </TileOption>
                          <TileOption value="warning">
                            <Icon size="md">warning</Icon>
                          </TileOption>
                          <TileOption value="chat_bubble_outline">
                            <Icon size="md">chat_bubble_outline</Icon>
                          </TileOption>
                          <TileOption value="">No Icon</TileOption>
                        </TileSelector>
                      </HorizontalGutter>
                      <HorizontalGutter size="half" container="section">
                        <div>
                          <Localized id="configure-messageBox-writeAMessage">
                            <Typography
                              variant="bodyCopyBold"
                              container={
                                <label htmlFor="configure-messageBox-content" />
                              }
                            >
                              Write a Message
                            </Typography>
                          </Localized>
                        </div>
                        <Suspense fallback={<Spinner />}>
                          <MarkdownEditor
                            id="configure-messageBox-content"
                            name={contentInput.name}
                            onChange={contentInput.onChange}
                            value={contentInput.value}
                          />
                        </Suspense>
                        <ValidationMessage meta={meta} />
                      </HorizontalGutter>
                    </>
                  )}
                </Field>
              )}
            </Field>
          )}
        </HorizontalGutter>
      </ToggleConfig>
    )}
  </Field>
);

export default MessageBoxConfig;